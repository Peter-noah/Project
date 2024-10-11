import React, { useEffect, useRef } from "react";
import { Box, Typography, Card, CardContent, Divider } from "@mui/material";

// Sample data based on your image
const userData = [
  { user_id: 1, username: "Helo", password_hash: "123456", email: "helo@gmail.com", created_at: "2024-10-11 15:42:57.827" },
  { user_id: 2, username: "John", password_hash: "123456", email: "John@gmail.com", created_at: "2024-10-11 15:52:25.066" },
  { user_id: 3, username: "Pork", password_hash: "123456", email: "Pork@gmail.com", created_at: "2024-10-11 15:52:34.576" },
  { user_id: 4, username: "Sigma", password_hash: "123456", email: "Sigma@gmail.com", created_at: "2024-10-11 15:52:41.709" },
  { user_id: 5, username: "Allah", password_hash: "123456", email: "Allah@gmail.com", created_at: "2024-10-11 15:52:47.343" },
  { user_id: 6, username: "madagasga", password_hash: "asdfgh", email: "madagasga@gmail.com", created_at: "2024-10-11 15:53:00.114" },
  { user_id: 7, username: "Marine", password_hash: "123456", email: "ma@gmail.com", created_at: "2024-10-11 16:15:04.028" },
];

export default function Dashboard() {
  const barChartRef = useRef(null);
  const pieChartRef = useRef(null);
  const lineChartRef = useRef(null);

  useEffect(() => {
    drawBarChart();
    drawPieChart();
    drawLineChart();
  }, []);

  const drawBarChart = () => {
    const canvas = barChartRef.current;
    const ctx = canvas.getContext("2d");

    const barWidth = 40;
    const barSpacing = 20;
    const chartHeight = 200;
    const chartWidth = canvas.width;
    
    ctx.clearRect(0, 0, chartWidth, chartHeight);

    // Draw bars
    userData.forEach((user, index) => {
      const barHeight = user.user_id * 20; // Example scaling of user_id
      ctx.fillStyle = "#4caf50";
      ctx.fillRect(
        index * (barWidth + barSpacing),
        chartHeight - barHeight,
        barWidth,
        barHeight
      );
      
      // Draw labels
      ctx.fillStyle = "#000";
      ctx.fillText(user.username, index * (barWidth + barSpacing) + 5, chartHeight - 5);
    });
  };

  const drawPieChart = () => {
    const canvas = pieChartRef.current;
    const ctx = canvas.getContext("2d");
    const totalUsers = userData.length;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 100;

    let startAngle = 0;

    userData.forEach((user, index) => {
      const sliceAngle = (2 * Math.PI) / totalUsers;
      const endAngle = startAngle + sliceAngle;

      // Draw slice
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      
      // Assign different colors to slices
      ctx.fillStyle = `hsl(${(index / totalUsers) * 360}, 100%, 50%)`;
      ctx.fill();

      startAngle = endAngle;
      
      // Add labels
      ctx.fillStyle = "#000";
      ctx.fillText(user.username, centerX + radius * Math.cos(startAngle - sliceAngle / 2) * 1.2, centerY + radius * Math.sin(startAngle - sliceAngle / 2) * 1.2);
    });
  };

  const drawLineChart = () => {
    const canvas = lineChartRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const points = userData.map((user, index) => ({
      x: (index + 1) * 100,
      y: 200 - user.user_id * 20, // Scaling user_id
    }));

    // Draw line
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    points.forEach((point) => {
      ctx.lineTo(point.x, point.y);
    });
    ctx.strokeStyle = "#ff0000";
    ctx.stroke();
    
    // Draw points
    points.forEach((point) => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
      ctx.fillStyle = "#0000ff";
      ctx.fill();
    });
  };

  return (
    <Box sx={{ padding: 4, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Typography variant="h3" gutterBottom sx={{ textAlign: "center", fontWeight: 'bold', color: '#1976d2' }}>
        Dashboard
      </Typography>

      {/* Bar Chart */}
      <Card variant="outlined" sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
            Bar Chart: User ID by Username
          </Typography>
          <Typography variant="body2" gutterBottom>
            This bar chart displays the user IDs associated with each username. The height of each bar represents the user ID, with labels indicating the corresponding usernames.
          </Typography>
          <Divider sx={{ my: 2 }} />
          <canvas ref={barChartRef} width={500} height={200} style={{ display: 'block', margin: '0 auto' }} />
        </CardContent>
      </Card>

      {/* Pie Chart */}
      <Card variant="outlined" sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
            Pie Chart: Distribution of Usernames
          </Typography>
          <Typography variant="body2" gutterBottom>
            This pie chart illustrates the distribution of usernames. Each slice represents a unique user, and the colors differentiate between the users.
          </Typography>
          <Divider sx={{ my: 2 }} />
          <canvas ref={pieChartRef} width={300} height={300} style={{ display: 'block', margin: '0 auto' }} />
        </CardContent>
      </Card>

      {/* Line Chart */}
      <Card variant="outlined" sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
            Line Chart: User ID Creation Over Time
          </Typography>
          <Typography variant="body2" gutterBottom>
            This line chart represents the user IDs over time. The x-axis corresponds to the time of creation, while the y-axis represents the user ID.
          </Typography>
          <Divider sx={{ my: 2 }} />
          <canvas ref={lineChartRef} width={500} height={200} style={{ display: 'block', margin: '0 auto' }} />
        </CardContent>
      </Card>
    </Box>
  );
}
