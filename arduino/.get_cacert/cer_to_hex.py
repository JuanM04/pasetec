import sys
import binascii

filename = sys.argv[1]
output = sys.argv[2]

with open(filename, 'rb') as file:
    content = file.read()

hexData = binascii.hexlify(content)
hexList = list(''.join(map(chr, hexData)))

caCertLen = 0
hexOutput = '  '

x = len(hexList)
for i in range(0, (x-1), 2):
    first = hexList[i]
    second = hexList[i+1]
    hexOutput += '0x' + first + second + ', '
    caCertLen += 1
    if i%24 > 20:
        hexOutput += '\n  '

if hexOutput.endswith('\n  '):
    hexOutput = hexOutput[:-5]
else:
    hexOutput = hexOutput[:-2]

with open(output, 'w+') as file:
    file.write('const unsigned char caCert[] PROGMEM = {\n')
    file.write(hexOutput + '\n')
    file.write('};\n')
    file.write('const unsigned int caCertLen = ' + str(caCertLen) + ';')