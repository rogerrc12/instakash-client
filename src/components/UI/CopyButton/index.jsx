import React, { useState } from "react";
import { Tooltip } from "antd";
import { CopyToClipboard } from "react-copy-to-clipboard";

import classes from "./CopyButton.module.scss";

const CopyButton = (props) => {
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };
  return (
    <CopyToClipboard text={props.textToCopy} onCopy={onCopy}>
      <Tooltip placement='bottomRight' title={props.tooltip} visible={copied}>
        <small className={classes.Copy} style={props.style || {}}>
          {props.children}
        </small>
      </Tooltip>
    </CopyToClipboard>
  );
};

export default CopyButton;
