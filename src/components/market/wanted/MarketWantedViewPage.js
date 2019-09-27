import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchMarketWanted } from "../../../actions/MarketWantedActions";
import MarketWantedDetails from "./MarketWantedDetails";
import Title from "../../includes/Title";
import Alert from "../../includes/Alert";

const mapStateToProps = state => ({
  current: state.market.wanted.current
});

const mapDispatchToProps = {
  fetchMarketWanted
};

const MarketWantedViewPage = ({ current, fetchMarketWanted, match }) => {
  const wantedId = match.params.id;

  const [wanted, setWanted] = useState({
    title: "Loading requested wanted item ...",
    subtitle: "",
    description: "",
    offerPrice: 0.0,
    activitys: "",
    images: [],
    topImage: "/images/default.png"
  });

  useEffect(() => {
    fetchMarketWanted(wantedId);
  }, [fetchMarketWanted, wantedId]);

  useEffect(() => {
    if (current && current._id) {
      setWanted(current);
    }
  }, [current]);

  return (
    <div>
      <Title title={`Wanted: ${!wanted ? "Loading..." : wanted.title}`} />
      <section
        id="main"
        className="container-fluid"
        aria-label="main body of content plus related links and features"
      >
        <div className="container">
          <Alert />
          <MarketWantedDetails wanted={wanted} />
        </div>
      </section>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MarketWantedViewPage);
