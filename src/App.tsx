import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { currentMonth } from "./utils/utils";
import { FoodDBProvider, useFoodDB } from "./contexts/FoodDB";
import FoodOfTheMonth from "./routes/FoodOfTheMonth";
import FoodPage from "./routes/FoodPage";
import Layout from "./routes/Layout";
import { NotFound } from "./routes/NotFound";
import { CircularProgress, Box, Typography, Button } from "@mui/material";
import { fetchSeasonalFoodData } from "./api";
import type { FoodList } from "./types/food";
import fetchCsvData from "./loadData"; // Keep for fallback

// Fallback component to load CSV if API fails
const FallbackDataLoader = ({ onDataLoaded }: { onDataLoaded: (data: FoodList) => void }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCsvData = async () => {
      try {
        setLoading(true);
        await fetchCsvData(onDataLoaded, "ITALIA-fruits-and-veggies.csv");
      } catch (err) {
        setError("Failed to load fallback data. Please try again later.");
        console.error("Failed to load fallback data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadCsvData();
  }, [onDataLoaded]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', p: 3 }}>
        <Typography color="error" variant="body1">{error}</Typography>
        <Button variant="contained" onClick={() => window.location.reload()} sx={{ mt: 2 }}>
          Retry
        </Button>
      </Box>
    );
  }

  return null;
};

// Loading state component
const LoadingState = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
    <CircularProgress size={60} />
    <Typography variant="h6" sx={{ mt: 2 }}>Loading seasonal food data...</Typography>
  </Box>
);

// Error state component
const ErrorState = ({ error, onRetry }: { error: Error, onRetry: () => void }) => (
  <Box sx={{ textAlign: 'center', p: 3, maxWidth: '500px', margin: '0 auto', mt: 8 }}>
    <Typography variant="h5" color="error" gutterBottom>
      Failed to load data
    </Typography>
    <Typography variant="body1" paragraph>
      {error.message || "An unexpected error occurred while fetching food data."}
    </Typography>
    <Button variant="contained" onClick={onRetry} sx={{ mr: 2 }}>
      Retry
    </Button>
    <Button variant="outlined" onClick={() => window.location.reload()}>
      Reload page
    </Button>
  </Box>
);

// App content with both providers
const AppContent = () => {
  const { state, refreshData } = useFoodDB();
  const { data: food, loading, error } = state;

  if (loading && food.length === 0) {
    return <LoadingState />;
  }

  if (error && food.length === 0) {
    return (
      <>
        <ErrorState error={error} onRetry={() => refreshData()} />
        <FallbackDataLoader onDataLoaded={(data) => refreshData()} />
      </>
    );
  }

  return (
    <BrowserRouter basename={import.meta.env.VITE_BASE_URL}>
      <div className="App">
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Layout food={food} />}>
            <Route
              index
              element={<Navigate to={`/month/${currentMonth}`} replace />}
            />
            <Route
              path="/:id"
              element={<FoodPage key="foodpage"/>}
            />
            <Route
              path="/month/:selectedMonthNum"
              element={<FoodOfTheMonth />}
            />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

// Main App component
export default function App() {
  const [initialData, setInitialData] = useState<FoodList | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [useApiDirectly, setUseApiDirectly] = useState(true);

  // Try to load data from API first
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        // First try API
        if (useApiDirectly) {
          const apiData = await fetchSeasonalFoodData({
            region: 'ITALIA', // Default region parameter
          });
          setInitialData(apiData);
          setIsLoading(false);
          return;
        }
      } catch (err) {
        console.error("Error loading data from API, falling back to CSV:", err);
        setUseApiDirectly(false);
      }

      // If API fails, use CSV as backup
      if (!useApiDirectly) {
        try {
          await fetchCsvData(setInitialData, "ITALIA-fruits-and-veggies.csv");
        } catch (csvErr) {
          console.error("Failed to load CSV data:", csvErr);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadInitialData();
  }, [useApiDirectly]);

  if (isLoading) {
    return <LoadingState />;
  }

  // Always provide FoodDBProvider, either with initial data or not
  return (
    <FoodDBProvider 
      initialState={initialData || undefined}
      apiParams={{ region: 'ITALIA' }}
    >
      <AppContent />
    </FoodDBProvider>
  );
}
}
