const commutesPerYear=260*2;
const litresPerKM=10/100;
const gasListreCost=1.5;
const litreCostKM=litresPerKM*gasListreCost;
const secondsPerDay=60*60*24;
type DistanceProps={
    leg:google.maps.DirectionsLeg;
};
export default function Distance({leg}:DistanceProps){
    if(!leg.distance||!leg.duration) return null;
    const days=Math.floor(
       ( commutesPerYear*leg.duration.value)/secondsPerDay
    )
return(
    <div>
        <p>
            This home is <span className="highlight">{leg.distance.text}</span>
            <p>
            away from your home. That would take{""}</p>
            <span className="highlight">{leg.duration.text}</span>each diretion
        </p>
        <p>{days}</p>
    </div>
)
}