import { BaseRepository } from '@/apis/base.repository';
import { LoadingComponent } from '@/components/loading/Loading.Component';
import HttpClient from '@/libs/http/http.client';
import { FC, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

export const HealthRoutes = ({}) => {
  return (
    <Routes>
      <Route path={'/'} element={<HealthRoute />} />
    </Routes>
  );
};

export const HealthRoute = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [apiResponse, setApiResponse] = useState<unknown>();

  useEffect(() => {
    const healthApi = new HealthApi();
    setIsFetching(true);

    healthApi
      .getApiHealth()
      .then((response) => {
        setApiResponse(response);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, []);

  return (
    <div style={{ marginLeft: '20vw' }}>
      <h1>Lucra FE: HealthCheck</h1>
      <p>Lucra FE is running</p>

      <h2>Backend</h2>
      {isFetching ?? <LoadingComponent loadingText="Fetching API Health" />}
      <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
    </div>
  );
};

class HealthApi extends BaseRepository {
  getApiHealth = async (): Promise<unknown> => {
    return HttpClient.get(`${this.apiUrl}/api/health`);
  };
}
