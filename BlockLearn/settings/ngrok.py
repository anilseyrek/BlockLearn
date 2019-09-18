# This setting file is prepared for ngrok usages
# It handles secure localhost tunneling for testinng purposes
# Don't forget to add your ngrok links to required variables

from .local import *

NGROK_BACKEND = 'c282529c.ngrok.io'
NGROK_FRONTEND = 'a7c63c58.ngrok.io'

ALLOWED_HOSTS += [NGROK_BACKEND, NGROK_FRONTEND]
