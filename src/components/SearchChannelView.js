import Button from "react-bootstrap/Button";

export default function SearchChannelView({
  display,
  valid,
  filterDefault,
  filterLive,
  display2,
  searchedChannels,
  handleInputChange,
  loading,
  empty,
  updateSearch,
}) {
  //Control what to display
  if (loading) display = <h3 className="centerMiddle">loading...</h3>;
  else if (valid && empty) {
    display = "";
  } else if (valid) {
    display = (
      <div className="centerMiddle2">
        Filter by:
        <button onClick={filterDefault} style={{ padding: "10px" }}>
          Live/Offline
        </button>
        <button onClick={filterLive} style={{ padding: "10px" }}>
          Live
        </button>
        {display2}
        <div>
          {searchedChannels.map((element, i) => (
            <ol key={i}>
              <img
                src={element.thumbnail_url}
                alt="pic"
                style={{ height: "100px" }}
              ></img>
              <h3>
                {i + 1 + "."} {element.displayName}
                {}
              </h3>
              <p>User ID: {element.id}</p>
              <p>Status: {element.live}</p>
              <p>Live Since: {element.liveSince}</p>
              <p>BroadCast langauge: {element.language}</p>
              <p>Stream Title: {element.title}</p>
              <p>Game : {element.gameName}</p>
              <p>Game ID: {element.gameID}</p>
            </ol>
          ))}
        </div>
      </div>
    );
  } else {
    display = <p className="centerMiddle">No results.</p>;
  }

  return (
    <div>
      <p className="center">
        Returns a list of channels (users who have streamed within the past 6
        months) that match the query via channel name or description either
        entirely or partially. Results include both live and offline channels
      </p>
      <form className="centerForm">
        <input
          type="text"
          className="input"
          placeholder="Search Channels"
          onChange={handleInputChange}
        />
        <Button
          variant="outline-dark"
          onClick={updateSearch}
          disabled={loading}
        >
          Search
        </Button>
      </form>
      {display}
    </div>
  );
}
