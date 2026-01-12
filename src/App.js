import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Chip,
  IconButton,
  Stack,
  CssBaseline,
  Box,
  Divider,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Schedule";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import AddTaskIcon from "@mui/icons-material/AddTask";

const STORAGE_KEY = "task-tracker-tasks";

export default function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved) setTasks(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!task.trim()) return;
    setTasks([...tasks, { id: Date.now(), title: task, completed: false }]);
    setTask("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: { main: "#6C63FF" },
    },
    shape: { borderRadius: 14 },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ mt: 6 }}>
        <Card elevation={8}>
          {/* HEADER */}
          <Box
            sx={{
              p: 3,
              color: "white",
              background:
                "linear-gradient(135deg, #6C63FF, #836FFF)",
            }}
          >
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="h5" fontWeight="bold">
                Task Tracker
              </Typography>
              <IconButton onClick={() => setDarkMode(!darkMode)}>
                <DarkModeIcon sx={{ color: "white" }} />
              </IconButton>
            </Stack>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Organize your work efficiently
            </Typography>
          </Box>

          <CardContent>
            {/* INPUT */}
            <Stack direction="row" spacing={2} mb={3}>
              <TextField
                fullWidth
                placeholder="What do you need to do?"
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />
              <Button
                variant="contained"
                startIcon={<AddTaskIcon />}
                onClick={addTask}
              >
                Add
              </Button>
            </Stack>

            <Divider sx={{ mb: 2 }} />

            {/* TASK LIST */}
            <List>
              {tasks.map((t) => (
                <ListItem
                  key={t.id}
                  sx={{
                    mb: 1,
                    borderRadius: 2,
                    transition: "0.2s",
                    "&:hover": {
                      backgroundColor: "action.hover",
                      transform: "scale(1.01)",
                    },
                  }}
                  secondaryAction={
                    <Chip
                      icon={
                        t.completed ? (
                          <CheckCircleIcon />
                        ) : (
                          <PendingIcon />
                        )
                      }
                      label={t.completed ? "Completed" : "Pending"}
                      color={t.completed ? "success" : "warning"}
                      onClick={() => toggleTask(t.id)}
                      clickable
                    />
                  }
                >
                  <ListItemText
                    primary={t.title}
                    sx={{
                      textDecoration: t.completed
                        ? "line-through"
                        : "none",
                      opacity: t.completed ? 0.6 : 1,
                    }}
                  />
                </ListItem>
              ))}
            </List>

            {/* EMPTY STATE */}
            {tasks.length === 0 && (
              <Box textAlign="center" mt={4} color="text.secondary">
                <Typography variant="h6">No tasks yet</Typography>
                <Typography variant="body2">
                  Add your first task and stay productive...
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      </Container>
    </ThemeProvider>
  );
}
