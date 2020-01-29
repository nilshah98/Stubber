import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import HorizontalTimeline from "react-horizontal-timeline";

import avatar from "assets/img/faces/marc.jpg";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);
const VALUES = ["2020-01-12", "2020-01-15", "2020-01-17", "2020-01-20", "2020-01-25"];
const DATA = ["Truck Start", "Truck Drive", "Truck Stop", "Truck Collect", "Truck Drop"];

export default function UserProfile() {
  const [value, setValue] = useState(0);
  const [previous, setPrevious] = useState(0);

  const classes = useStyles();
  return (
    <div>
      <div>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Timeline</h4>
            <p className={classes.cardCategoryWhite}>Truck pickup schedule</p>
          </CardHeader>
          <CardBody>
            {/* Bounding box for the Timeline */}
            <div style={{ width: '100%', height: '150px', margin: '0 auto' }}>
              <HorizontalTimeline
                labelWidth={120}
                index={value}
                indexClick={(index) => {
                  setPrevious(value);
                  setValue(index);
                }}
                values={VALUES}
              />
            </div>
            <div style={{textAlign:"center"}}>
              {/* any arbitrary component can go here */}    
              {DATA[value]}
            </div>
          </CardBody>
          <CardFooter>

          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
