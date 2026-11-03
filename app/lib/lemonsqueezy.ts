type LemonSubscriptionAttributes = {
  customer_id?: number | string;
  variant_id?: number | string;
  trial_ends_at?: string | null;
  user_email?: string;
  status?: string;
  cancelled?: boolean;
  renews_at?: string | null;
  ends_at?: string | null;
  urls?: {
    customer_portal?: string | null;
    update_payment_method?: string | null;
  } | null;
};

export type LemonSubscription = {
  data: {
    type: "subscriptions" | string;
    id: string;
    attributes: LemonSubscriptionAttributes;
  };
};

const API_BASE = "https://api.lemonsqueezy.com/v1";

function apiKey() {
  const key = process.env.LEMONSQUEEZY_API_KEY;
  if (!key) throw new Error("LEMONSQUEEZY_API_KEY is not configured");
  return key;
}

async function lemonRequest(path: string, init: RequestInit = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      Accept: "application/vnd.api+json",
      "Content-Type": "application/vnd.api+json",
      Authorization: `Bearer ${apiKey()}`,
      ...(init.headers || {}),
    },
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`Lemon Squeezy request failed (${response.status})${body ? `: ${body.slice(0, 300)}` : ""}`);
  }

  return (await response.json()) as LemonSubscription;
}

export async function getLemonSubscription(subscriptionId: string) {
  return lemonRequest(`/subscriptions/${encodeURIComponent(subscriptionId)}`);
}

export async function cancelLemonSubscription(subscriptionId: string) {
  return lemonRequest(`/subscriptions/${encodeURIComponent(subscriptionId)}`, {
    method: "DELETE",
  });
}

export async function resumeLemonSubscription(subscriptionId: string) {
  return lemonRequest(`/subscriptions/${encodeURIComponent(subscriptionId)}`, {
    method: "PATCH",
    body: JSON.stringify({
      data: {
        type: "subscriptions",
        id: subscriptionId,
        attributes: { cancelled: false },
      },
    }),
  });
}


export type LemonPaidInvoice = {
  verified: boolean;
  paidAt: string | null;
};
/**
 * Check the payment provider for a non-refunded, nonzero paid invoice
 * issued within the current monthly billing interval (up to 45 days).
 * A cancelled free trial should never be mistaken for a paid month.
 */
export async function getRecentPaidSubscriptionInvoice(subscriptionId: string, reference = Date.now()): Promise<LemonPaidInvoice> {
  const params = new URLSearchParams({
    "filter[subscription_id]": subscriptionId,
    "filter[status]": "paid",
    "page[size]": "20",
  });
  const response = await lemonRequest(`/subscription-invoices?${params.toString()}`) as unknown as {
    data?: Array<{
      attributes?: {
        subscription_id?: number | string;
        status?: string;
        refunded?: boolean;
        total?: number;
        refunded_amount?: number;
        created_at?: string;
      };
    }>;
  };
  const latest = response.data?.find((invoice) => {
    const a = invoice.attributes;
    if (!a || String(a.subscription_id) !== subscriptionId) return false;
    const when = Date.parse(a.created_at || "");
    const actualPaid = Number(a.total || 0) - Number(a.refunded_amount || 0);
    return a.status === "paid" && !a.refunded && actualPaid > 0 &&
      Number.isFinite(when) && when <= reference &&
      reference - when <= 45 * 24 * 60 * 60 * 1000;
  });
  return { verified: Boolean(latest), paidAt: latest?.attributes?.created_at || null };
}

export function subscriptionFields(subscription: LemonSubscription) {
  const attributes = subscription.data.attributes || {};
  return {
    lemon_subscription_id: subscription.data.id,
    lemon_customer_id:
      attributes.customer_id === undefined || attributes.customer_id === null
        ? null
        : String(attributes.customer_id),
    subscription_status: attributes.status ? String(attributes.status).toLowerCase() : null,
    subscription_cancelled: Boolean(attributes.cancelled),
    subscription_renews_at: attributes.renews_at || null,
    subscription_ends_at: attributes.ends_at || null,
    subscription_synced_at: new Date().toISOString(),
  };
}
