import React, { FC, useCallback, useContext, useEffect, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { ApiContext } from '@/apis/api.context';
import { Button } from '@/atoms/button/Button';

interface LinkPlaidProps {
  children?: React.ReactNode;
  informParent?: (status: 'success' | 'error') => void;
}

export const LinkPlaid: FC<LinkPlaidProps> = ({ children, informParent }) => {
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
    await bankApi
      .syncLinkedAccounts(publicToken)
      .then(() => {
        informParent && informParent('success');
      })
      .catch(() => {
        informParent && informParent('error');
      });
  }, []);

  const config: Parameters<typeof usePlaidLink>[0] = {
    token: linkToken,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);
  return (
    <div>
      <Button onClick={() => open()} disabled={!ready}>
        {children ? children : 'Link'}
      </Button>
    </div>
  );
};
