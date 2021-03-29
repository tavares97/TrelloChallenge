import React, { Fragment, CSSProperties } from "react";

export interface StylesDictionary {
  [Key: string]: CSSProperties;
}

const styles: StylesDictionary = {
  column: {
    float: "left",
    width: "100%",
    marginBottom: "16px",
    padding: "0.8px",
  },
  card: {
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
    margin: "8px",
  },
  container: {
    padding: " 0 16px 10px",
    background: "#424242",
  },
  title: {
    color: "grey",
  },
  button: {
    border: "none",
    outline: "0",
    display: "inline-block",
    padding: "8px",
    color: "white",
    backgroundColor: "#000",
    textAlign: "center",
    cursor: "pointer",
    width: "100%",
    textDecoration: "none",
  },
};

const About = () => {
  return (
    <Fragment>
      <div className="container">
        <div className="center">
          <h1>About This App</h1>
          <p>Simple challenge to create a trello replica.</p>
        </div>

        <h2 style={{ textAlign: "center" }}>MADE BY:</h2>
        <div style={styles.column}>
          <div style={styles.card}>
            <div style={styles.container}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  paddingTop: "15px",
                }}
              >
                <img
                  className="circle responsive-img"
                  src="https://avatars.githubusercontent.com/u/49954804?s=460&u=d67c9b2980e7768e6d88c4c94780ca5feed88b90&v=4"
                  alt="Andre"
                  width="20%"
                />
                <h2>André Tavares</h2>
              </div>

              <p style={styles.title}>Developer</p>
              <p style={{ marginBottom: "0px" }}>My Email:</p>
              <p style={{ marginTop: "0px" }}>afpt.digital2013@gmail.com</p>
              <p>
                <a href="https://github.com/tavares97" style={styles.button}>
                  GitHub Page
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default About;
