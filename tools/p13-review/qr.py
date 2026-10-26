"""Decode QR via the installed zbar library; no dependency downloads or external requests."""
import ctypes as C
from PIL import Image
lib=C.CDLL('libzbar.so.0')
for name,args,result in [('zbar_image_scanner_create',[],C.c_void_p),('zbar_image_create',[],C.c_void_p),('zbar_image_scanner_set_config',[C.c_void_p,C.c_int,C.c_int,C.c_int],C.c_int),('zbar_image_set_format',[C.c_void_p,C.c_ulong],None),('zbar_image_set_size',[C.c_void_p,C.c_uint,C.c_uint],None),('zbar_image_set_data',[C.c_void_p,C.c_void_p,C.c_ulong,C.c_void_p],None),('zbar_scan_image',[C.c_void_p,C.c_void_p],C.c_int),('zbar_image_first_symbol',[C.c_void_p],C.c_void_p),('zbar_symbol_next',[C.c_void_p],C.c_void_p),('zbar_symbol_get_data',[C.c_void_p],C.c_char_p),('zbar_image_destroy',[C.c_void_p],None),('zbar_image_scanner_destroy',[C.c_void_p],None)]:
 f=getattr(lib,name);f.argtypes=args;f.restype=result

def decode(path):
 image=Image.open(path).convert('L');pixels=C.create_string_buffer(image.tobytes());scanner=lib.zbar_image_scanner_create();zimage=lib.zbar_image_create()
 try:
  lib.zbar_image_scanner_set_config(scanner,0,0,1);lib.zbar_image_set_format(zimage,int.from_bytes(b'Y800','little'));lib.zbar_image_set_size(zimage,*image.size);lib.zbar_image_set_data(zimage,pixels,len(image.tobytes()),None);lib.zbar_scan_image(scanner,zimage);symbol=lib.zbar_image_first_symbol(zimage);values=[]
  while symbol:values.append(lib.zbar_symbol_get_data(symbol).decode());symbol=lib.zbar_symbol_next(symbol)
  return values
 finally:lib.zbar_image_destroy(zimage);lib.zbar_image_scanner_destroy(scanner)
if __name__=='__main__':
 import sys,json
 print(json.dumps(decode(sys.argv[1])))
