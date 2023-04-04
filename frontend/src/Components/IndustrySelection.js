import React, { useState } from "react";
import { Button, Chip } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import Nav from "./Nav";
import "../CSS/SecondProgressBarForm.css";
import { LinearDeterminate } from "./ProgressBar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
  },
}));

const IndustrySelection = ({ industryQuestion, matchedWith }) => {
  const classes = useStyles();
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [isAnyIndustriesSelected, setIsAnyIndustriesSelected] = useState(false);

  const handleSelectIndustry = (industry) => {
    if (selectedIndustries.length < 5 && !selectedIndustries.includes(industry)) {
      setSelectedIndustries([...selectedIndustries, industry]);
    }
  };

  const handleDeleteIndustry = (industry) => {
    setSelectedIndustries(selectedIndustries.filter((i) => i !== industry));
  };

  const handleSelectAnyIndustries = () => {
    setSelectedIndustries([]);
    setIsAnyIndustriesSelected(true);
  };

  const handleDeselectAnyIndustries = () => {
    setIsAnyIndustriesSelected(false);
  };

  return (
    <>
      <Nav showLogoutButton={true} />
      <div className="menteeRoleContainer">
        <LinearDeterminate page={2} />
        <h1 className="welcome">Let's get you matched!</h1>
        <h2 className="tellus">
          Answer the following questions to get matched with a compatible {matchedWith}.
        </h2>
        <div className="mode-container"></div>
        <p>
          {industryQuestion}
        </p>
        <div className={classes.root}>
          {[
            "Healthcare",
            "Finance",
            "Web3",
            "Ecommerce",
            "Education",
            "Game",
            "Energy",
            "Hospitality",
            "Transportation",
            "Construction",
            "Media",
            "Telecommunications",
            "Agriculture",
            "Government",
            "Nonprofit",
            "Other",
          ].map((industry) => (
            <Chip
              key={industry}
              label={industry}
              clickable
              onClick={() => handleSelectIndustry(industry)}
              onDelete={
                selectedIndustries.includes(industry)
                  ? () => handleDeleteIndustry(industry)
                  : undefined
              }
              color={selectedIndustries.includes(industry) ? "success" : undefined}
              disabled={isAnyIndustriesSelected}
            />
          ))}
          <Chip
            label="I'm open to any industries"
            clickable
            onClick={isAnyIndustriesSelected ? handleDeselectAnyIndustries : handleSelectAnyIndustries}
            color={isAnyIndustriesSelected ? "success" : undefined}
          />
        </div>
        <Link to="">
          <Button
            variant="contained"
            color="success"
            className="submitButton"
            disabled={!isAnyIndustriesSelected && selectedIndustries.length === 0}
          >
            Continue
          </Button>
        </Link>
      </div>
    </>
  );
};

export default IndustrySelection;