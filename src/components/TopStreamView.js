import "../App.css";

export default function TopStreamView({ topStream, getTopStream }) {
  return (
    <div>
      <div className="centerMiddle2">
        <h3>Top Live Viewed Channels</h3>
        <div>
          {topStream.map((element, i) => (
            <ol key={i}>
              <h3>
                {i + 1 + ")"} {element.userName}
                <p></p>
                <img src={element.pic}></img>
              </h3>
              <p>{"Views: " + element.viewCount}</p>
              <p>{"Game :" + element.gameName}</p>
              <p>{"Title :" + element.title}</p>
              <p>{"Live since :" + element.liveSince}</p>
              <p>{"Langauge :" + element.language}</p>
            </ol>
          ))}
        </div>
      </div>
    </div>
  );
}
