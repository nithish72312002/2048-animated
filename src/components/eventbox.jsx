import { useAddress, useContract, useContractEvents } from "@thirdweb-dev/react";
import { abi } from "./abi";
import {buttonrecorderca, explorerlink} from "./const";

export default function Eventbox() {
  const contractAddress = buttonrecorderca;
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
    <div style={{ width: "300px", fontSize: "sm", height: "200px", overflowY: "scroll" , border: "2px solid #000", padding: "5px", marginBottom: "10px", marginTop: "20px"}}>
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
              Tx: <a href={`${explorerlink}/tx/${event.transaction.transactionHash}`} rel="noopener noreferrer" target="_blank" style={{ color: 'black' }}>
                {`${event.transaction.transactionHash.slice(0, 6)}...${event.transaction.transactionHash.slice(-6)}`}
                </a> 
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
