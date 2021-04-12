import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

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

  if (valid && empty) {
    display = "";
  } else if (valid) {
    display = (
      <div className="topSpace">
        Filter by:
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={filterDefault}
          style={{ padding: "10px" }}
        >
          Live/Offline
        </button>
        <button
          type="button"
          className="btn btn-outline-success"
          onClick={filterLive}
          style={{ padding: "10px" }}
        >
          Live
        </button>
        {display2}
        <div className="card-group">
          {searchedChannels.map((element, i) => (
            <ol key={i}>
              <Card style={{ width: "15rem" }}>
                <Card.Img variant="top" src={element.thumbnail_url} />
                <Card.Body>
                  <div className="center">
                    <Link to={`/channel/${element.displayName}`}>
                      {element.displayName}
                    </Link>
                  </div>
                </Card.Body>
              </Card>
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
      <div className="center">
        <h1>Search Channel</h1>
        <p style={{ marginLeft: "25%", marginTop: "10%", maxWidth: "50%" }}>
          Returns a list of channels (users who have streamed within the past 6
          months) that match the query via channel name or description either
          entirely or partially. Results include both live and offline channels
        </p>
      </div>
      <form className="centerForm">
        <input
          type="text"
          className="input"
          placeholder="Search Channels"
          onChange={handleInputChange}
        />
        <button
          type="button"
          className="btn btn-dark"
          onClick={updateSearch}
          disabled={loading}
        >
          Search
        </button>
      </form>
      {display}
    </div>
  );
}
