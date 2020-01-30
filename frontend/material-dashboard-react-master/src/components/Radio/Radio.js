import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
// @material-ui/icons
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
//core components
import styles from "assets/jss/material-dashboard-react/checkboxAdnRadioStyle.js";

const useStyles = makeStyles(styles);

export default function CheckboxRadio(props) {
  const classes = useStyles();

  const { value, name } = props;

  return (
    <div>
      <Radio
        value={value}
        name={name}
        aria-label={value}
        icon={<FiberManualRecord className={classes.radioUnchecked} />}
        checkedIcon={<FiberManualRecord className={classes.radioChecked} />}
        classes={{
          checked: classes.radio
        }}
      />
    </div>
  );
}
