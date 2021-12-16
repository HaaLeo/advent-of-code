
interface Packet {
   version: number;
   type: number;
}

interface SinglePacket extends Packet {
   value: number;
}

interface OpPacket extends Packet {
   subPackets: PacketBase[];
}

type PacketBase = SinglePacket | OpPacket;

function isLiteralPacket(packet: PacketBase): packet is SinglePacket {
   return (packet as SinglePacket).value !== undefined;
}

function parsePacket(data: string): { packet: PacketBase; rest: string } {
   const chars = data.split('');
   const version = parseInt(chars.splice(0, 3).join(''), 2);
   const type = parseInt(chars.splice(0, 3).join(''), 2);

   if (type === 4) {
      let literalBin = '';
      let sub: string;
      do {
         sub = chars.splice(0, 5).join('').padEnd(5, '0');
         literalBin += sub.substring(1);
      } while (sub[0] !== '0')

      const packet: SinglePacket = { version, type, value: parseInt(literalBin, 2) };
      return { packet, rest: chars.join('') };
   }

   const lenghTypeID = chars.splice(0, 1)[0];

   if (lenghTypeID === '0') {
      const subPacketsLength = parseInt(chars.splice(0, 15).join(''), 2);
      let subPacketContent = chars.splice(0, subPacketsLength).join('');

      const subPackets: PacketBase[] = [];

      while (subPacketContent.length > 0) {
         const { packet, rest } = parsePacket(subPacketContent);

         subPackets.push(packet);
         subPacketContent = rest;
      }

      const packet: OpPacket = { version, type, subPackets };
      return { packet, rest: chars.join('') };
   } else {
      const subPacketCount = parseInt(chars.splice(0, 11).join(''), 2);
      let subData = chars.join('');

      const subPackets: PacketBase[] = [];

      for (let i = 0; i < subPacketCount; i++) {
         const { packet, rest } = parsePacket(subData);

         subPackets.push(packet);
         subData = rest;
      }

      const packet: OpPacket = { version, type, subPackets };
      return { packet, rest: subData };
   }
}

export const first = (input: string) => {
   const rootPacket = parsePacket(input).packet;

   function packetVersionSum(packet: PacketBase): number {
      if (isLiteralPacket(packet)) return packet.version;

      return packet.version + packet.subPackets.reduce((sum, sub) => sum + packetVersionSum(sub), 0);
   }

   return packetVersionSum(rootPacket);
};
