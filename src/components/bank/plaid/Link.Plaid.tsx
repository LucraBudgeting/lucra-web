import { Button } from '@mui/material';
import { FC, useCallback, useContext, useEffect, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { ApiContext } from '@/apis/api.context';

interface LinkPlaidProps {}

export const LinkPlaid: FC<LinkPlaidProps> = ({}) => {
  const [linkToken, setLinkToken] = useState<string>('');
  const { PlaidApi: bankApi } = useContext(ApiContext);

  useEffect(() => {
    const fetchLinkToken = async () => {
      const token = await bankApi.getLinkToken();
      setLinkToken(token);
    };
    fetchLinkToken();
  }, []);

  const onSuccess = useCallback(async (publicToken: string) => {
    console.log('public token:', publicToken);
    await bankApi.syncLinkedAccounts(publicToken);
  }, []);

  const config: Parameters<typeof usePlaidLink>[0] = {
    token: linkToken,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);
  return (
    <div>
      <Button onClick={() => open()} disabled={!ready}>
        Link Bank
      </Button>
    </div>
  );
};
