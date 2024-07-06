import React, { FC, useCallback, useContext, useEffect, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { Button } from '@/atoms/button/Button';
import { ApiContext } from '@/stores/contexts/api.context';

interface LinkPlaidProps {
  children?: React.ReactNode;
  informParent?: (status: 'success' | 'error') => void; // Only needed if parent needs to be informed or onSuccessCb is not present
  onSuccess?: (publicToken: string) => void;
}

export const LinkPlaid: FC<LinkPlaidProps> = ({ children, informParent, onSuccess }) => {
  const [tokenHash, setTokenHash] = useState<string>('');
  const [linkToken, setLinkToken] = useState<string>('');
  const { PlaidApi: bankApi } = useContext(ApiContext);

  useEffect(() => {
    const fetchLinkToken = async () => {
      const token = await bankApi.getLinkToken();
      setLinkToken(token);
    };
    fetchLinkToken();
  }, [tokenHash]);

  const plaidOnSuccess = useCallback(async (publicToken: string) => {
    setTokenHash(publicToken);

    if (onSuccess) {
      return onSuccess(publicToken);
    }

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
    onSuccess: plaidOnSuccess,
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
