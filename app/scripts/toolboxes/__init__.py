"""SafeBase Toolbox Talk content registry."""

from .hot_work import HOT_WORK
from .safety_harness import SAFETY_HARNESS
from .working_at_height import WORKING_AT_HEIGHT

TOOLBOXES = [
    HOT_WORK,
    SAFETY_HARNESS,
    WORKING_AT_HEIGHT,
]

__all__ = ["TOOLBOXES"]
