import { useAddress, useContract, useContractEvents } from "@thirdweb-dev/react";
import { abi } from "./abi";

export default function Eventbox() {
  const contractAddress = '0x4AF71ce8676c24258eDb5a096bACaA3C6ab6a402';
  const { contract } = useContract(contractAddress, abi);
  const address = useAddress();

  const { data: eventdata, isLoading, isError } = useContractEvents(
    contract,
    "ButtonPressTransaction",
    {
      queryFilter: {
        filters: {
          user: address,
        },
        order: "desc",
      },
      subscribe: true,
    },
  );

  return (
    <div style={{ width: "300px", fontSize: "sm", height: "200px", overflow: "scroll" }}>
      <h2>All Moves</h2>
      {isLoading && <p>Loading events...</p>}
      {isError && <p>Error loading events</p>}
      {eventdata && eventdata.length > 0 && (
        <div>
          {eventdata.map((event, index) => (
            event.data.user === address ? (
              <div key={index} style={{ flexDirection: "column", alignItems: "center" }}>
                <div style={{ alignSelf: 'start' }}>
                  Move: {event.data.button}
                </div>
                <div style={{ marginTop: 0, marginBottom: 4, alignSelf: "start" }}>
                  Tx:{event.transaction.transactionHash}
                </div>
              </div>
            ) : null
          ))}
        </div>
      )}
      {eventdata && eventdata.length === 0 && <p>No events available</p>}
    </div>
  );
};
