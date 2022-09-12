//PSEUDO code for list

//Dashboard
function Dashboard() {
  return (
    <div>
      <div><h1>Browse events in your community:</h1></div>
      <EventList events={events} addfunc={addToList}></EventList>
    </div>
}


//Certificate List
function CertifiateList({ certs, addfunc }) {
  return (
    <div className="eventListClass">
      {certs.map(cert => {
        return (<CertItem event={cert} addfunc={addfunc} key={cert._id}></CertItem>)
      })}
    </div>

  )
}

export default CertificatetList;


// Certificate Item
function CertItem({ cert, addfunc, key }) {
  return (
    <div>
      <img>{cert.title}</img>
      <div>{cert.title}</div>
    </div >
  )
};
