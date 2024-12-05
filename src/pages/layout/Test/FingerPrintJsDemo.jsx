import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import Fingerprint2 from 'fingerprintjs2';

const FingerPrintJsDemo = () => {
    const [uuid, setUuid] = useState('');
    const [fingerprint, setFingerprint] = useState('');
  
    useEffect(() => {
      // Generate UUID
      const generatedUuid = uuidv4();
      setUuid(generatedUuid);
  
      // Generate fingerprint using fingerprintjs2
      Fingerprint2.get((components) => {
        const values = components.map(component => component.value);
        const fingerprintHash = Fingerprint2.x64hash128(values.join(''), 31);
        setFingerprint(fingerprintHash);
      });
  
    }, []);
  
    return (
      <div className="flex justify-center items-center flex-col w-full gap-4">
        <h1 className="text-4xl font-bold">UUID and Fingerprint</h1>
        <p className="text-xl"><strong>UUID:</strong> {uuid}</p>
        <p className="text-xl"><strong>Fingerprint:</strong> {fingerprint}</p>
      </div>
    );
}

export default FingerPrintJsDemo
