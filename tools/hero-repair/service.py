# Loopback-only read fixture. No live Supabase or writes.
from http.server import BaseHTTPRequestHandler,HTTPServer
class Handler(BaseHTTPRequestHandler):
 def do_GET(self):
  self.send_response(200);self.send_header('Content-Type','application/json');self.end_headers();self.wfile.write(b'[]')
 def do_POST(self): self.send_error(405)
 def log_message(self,*args): pass
HTTPServer(('127.0.0.1',54530),Handler).serve_forever()
