import { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Board from "react-trello";

import {
  addLane,
  deleteLane,
  addCard,
  deleteCard,
  loadBoard,
} from "../../actions/trelloActions";

const Home = ({
  trello: { userBoard, user, lanes, cards, isAuthenticated },
  addLane,
  deleteLane,
  addCard,
  loadBoard,
  deleteCard,
}: any) => {
  const history = useHistory();
  useEffect(() => {
    if (user) loadBoard(user.id);

    if (!isAuthenticated) history.push("/login");
  }, [lanes, cards, loadBoard, user, isAuthenticated, history]);

  const onLaneAdd = (e) => {
    addLane({
      style: {
        width: 280,
      },
      title: e.title,
      userId: user.id,
    });
  };

  const onLaneDelete = (e) => {
    deleteLane(e);
  };

  const onCardAdd = (e, i) => {
    addCard({
      title: e.title,
      description: e.description,
      label: e.label,
      userId: user.id,
      laneId: i,
    });
  };

  const onCardDelete = (e) => {
    deleteCard(e);
  };

  return (
    <div>
      <h1>Board goes here</h1>

      <Board
        data={{ lanes: userBoard }}
        canAddLanes
        onLaneAdd={onLaneAdd}
        onLaneDelete={onLaneDelete}
        onCardAdd={onCardAdd}
        onCardDelete={onCardDelete}
        editable
        style={{ background: "#2b2a2a" }}
      />
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  trello: state.trello,
});

export default connect(mapStateToProps, {
  addLane,
  deleteLane,
  addCard,
  deleteCard,
  loadBoard,
})(Home);
