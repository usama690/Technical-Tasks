import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import {
  Card,
  CardHeader,
  IconButton,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import { DeleteOutlined, EditOutlined } from "@mui/icons-material";
import AppButton from "../Button/Index";
import { useDispatch,useSelector } from "react-redux";
import {
  asyncGetProjects,
  asyncUpdateProject,
} from "../../Store/Project/ProjectAsync";

const AppCard = ({
  title,
  subtitle,
  image,
  desc,
  liveUrl,
  gitHubUrl,
  handleDelete,
  handleEdit,
  status,
  id,
}) => {
  const [state, setState] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.user);
  useEffect(() => {
    dispatch(asyncGetProjects(user._id));
  }, [state]);
  const handleClick = async (status, id) => {
    try {
      let formData = new FormData();
      formData.append("id", id);
      if (status === "completed") formData.append("status", "completed");
      if (status === "archived") formData.append("status", "archived");
      let res = await dispatch(asyncUpdateProject({ body: formData })).unwrap();
      if (res.success || !res.success) {
        setState(true);
        if (state) setState(false);
        alert(res.message);
      }
    } catch (err) {
      alert(err);
    }
  };
  return (
    <Card elevation={3}>
      <CardHeader
        action={
          <IconButton>
            <EditOutlined onClick={handleEdit} />
            <DeleteOutlined onClick={handleDelete} />
          </IconButton>
        }
        title={title}
        subheader={subtitle}
      />
      <CardMedia component="img" height="100" image={image} alt="Paella dish" />
      <CardContent>
        <Typography
          className={styles.desc}
          variant="body2"
          color="textSecondary"
        >
          {desc}
        </Typography>
        <p className={styles.para} variant="caption" color="textSecondary">
          Live Url: <b>{liveUrl}</b>
        </p>
        <p className={styles.para} variant="caption" color="textSecondary">
          GitHub Link: <b>{gitHubUrl}</b>
        </p>
        <p className={styles.para} variant="caption" color="textSecondary">
          Current Status: <b>{status}</b>
        </p>
        {(status === "pending" || status === "archived") && (
          <AppButton
            onClick={() => handleClick("completed", id)}
            value="Mark as complete"
            variant="contained"
            isFullWidth={true}
          />
        )}
        {(status === "pending" || status === "completed") && (
          <AppButton
            onClick={() => handleClick("archived", id)}
            value="Move to archive"
            variant="contained"
            color="secondary"
            isFullWidth={true}
            sx={{ mt: 2 }}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default AppCard;
