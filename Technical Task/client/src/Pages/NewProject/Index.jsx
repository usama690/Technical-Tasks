import { TextField, Box, Grid, Container, Typography } from "@mui/material";
import AppButton from "../../Components/Button/Index";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncCreateProject,
  asyncUpdateProject,
} from "../../Store/Project/ProjectAsync";
import { useLocation, useNavigate } from "react-router-dom";

const AddProject = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
    setValue,
  } = useForm({ mode: "onChange" });
  const { state } = useLocation();
  const navigate = useNavigate();

  const [uploadImage, setUploadImage] = useState(null);
  const [imgError, setImgError] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.user);
  useEffect(() => {
    if (state) {
      setValue("projectName", state.projectName);
      setValue("description", state.description);
      setValue("liveUrl", state.liveUrl);
      setValue("gitHubLink", state.gitHubLink);
      setUploadImage(state.uploadImage);
    }
  }, [state]);

  const onSubmit = async (data) => {
    try {
      if (!uploadImage) return setImgError("Image is required");
      const formData = new FormData();
      formData.append("projectName", data.projectName);
      formData.append("description", data.description);
      formData.append("liveUrl", data.liveUrl);
      formData.append("gitHubLink", data.gitHubLink);
      formData.append("uploadImage", uploadImage);
      formData.append("user", user._id);
      let res = "";
      if (state) {
        formData.append("id", state._id);
        res = await dispatch(asyncUpdateProject({ body: formData })).unwrap();
      }
      if (!state) {
        res = await dispatch(asyncCreateProject({ body: formData })).unwrap();
      }
      reset();
      setUploadImage(null);
      if (res.success) alert(res.message);
      if (state) navigate("/", { replace: true });
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {!state ? (
          <Typography marginBottom={3} variant="h5">
            Create a new project
          </Typography>
        ) : (
          <Typography marginBottom={3} variant="h5">
            Update project
          </Typography>
        )}{" "}
        <Box
          onSubmit={handleSubmit(onSubmit)}
          component="form"
          display="flex"
          justifyContent="center"
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                name="projectName"
                {...register("projectName", {
                  required: "Project Name is required",
                })}
                placeholder="Enter Project Name"
                label="Project Name"
              />
              {errors.projectName && <span>{errors.projectName.message}</span>}
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="description"
                {...register("description", {
                  required: "Project Description is required",
                })}
                placeholder="Enter Project Description"
                label="Project Description"
              />
              {errors.description && <span>{errors.description.message}</span>}
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="liveUrl"
                {...register("liveUrl", {
                  required: "Project Live Url is required",
                })}
                placeholder="Enter Project Live Url"
                label="Project Live Url"
              />
              {errors.liveUrl && <span>{errors.liveUrl.message}</span>}
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="gitHubLink"
                {...register("gitHubLink", {
                  required: "Project GitHub Link is required",
                })}
                placeholder="Enter Project GitHub Link"
                label="Project GitHub Link"
              />
              {errors.gitHubLink && <span>{errors.gitHubLink.message}</span>}
            </Grid>
            <Grid item xs={12} md={12}>
              <input
                onChange={(e) => setUploadImage(e.target.files[0])}
                type="file"
                name="uploadImage"
              />
              {imgError && <span>{imgError}</span>}
            </Grid>
            <Grid item xs={12} md={12}>
              <AppButton
                value={state ? "Update" : "Submit"}
                variant="contained"
                type="submit"
                isFullWidth={true}
                sx={{ my: 1, mx: 1.5 }}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default AddProject;
