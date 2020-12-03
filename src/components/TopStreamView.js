import "../App.css";

export default function TopStreamView({ topStream, getTopStream }) {
  return (
    <div>
      <button onClick={getTopStream}>Update Top Channels</button>
      <div className="centerMiddle2">
        <h3>Top Live Viewed Channels</h3>
        <div>
          {topStream.map((element, i) => (
            <ol key={i}>
              <h3>
                {" "}
                {i + 1 + ")"} {element.userName}
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
