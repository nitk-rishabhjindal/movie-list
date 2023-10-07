import Ract, { useEffect, useState } from "react";
import axios from "axios";

import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

const headCells = [
  { field: "id", headerName: "ID", width: 150 },
  {
    field: "movie_name",
    headerName: "Movie Name",
    width: 300,
  },
  {
    field: "genre",
    headerName: "Genre",
    width: 200,
  },
  {
    field: "release_date",
    headerName: "Release date",
    width: 200,
  },
];

const API_URL = "https://run.mocky.io/v3/13176aee-1370-4dd2-a2f7-c6110b0c431d";

const Dashboard = () => {
  const [movieData, setMoveiData] = useState([]);
  const [searchText, setSearchText] = useState([]);
  const [searchMovies, setSearchMovie] = useState([]);

  useEffect(() => {
    axios
      .get(API_URL)
      .then(function (response) {
        // handle success
        console.log("data", response.data);
        setMoveiData(response?.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }, []);
  const handleSearchChange = (e) => {
    setSearchText(e?.target?.value);
  };

  useEffect(() => {
    const temp = movieData.filter((x) => {
      return x.movie_name.toLowerCase().includes(searchText.toLowerCase());
    });
    setSearchMovie(temp);
  }, [searchText]);

  return (
    <>
      <div style={{ padding: "12px 64px" }}>
        <h1>Movie List</h1>
        <div>
          <input
            type="text"
            placeholder="Search by movie name"
            value={searchText}
            onChange={handleSearchChange}
          ></input>
        </div>
      </div>
      <div style={{ padding: "12px 64px" }}>
        <div style={{ height: "77vh", width: "100%" }}>
          <DataGrid
            rows={searchText.length ? searchMovies : movieData}
            columns={headCells}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10, 20, 50, 100]}
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
