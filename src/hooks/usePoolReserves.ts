import { ethers } from 'ethers';
import {
    UiPoolDataProvider,
    ChainId,
    ReserveDataHumanized,
} from '@aave/contract-helpers';
import * as markets from '@bgd-labs/aave-address-book';
import { formatReserves, FormatReserveUSDResponse } from '@aave/math-utils';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

const provider = new ethers.providers.JsonRpcProvider(
    'https://eth-mainnet.public.blastapi.io',
);

const poolDataProviderContract = new UiPoolDataProvider({
    uiPoolDataProviderAddress: markets.AaveV3Ethereum.UI_POOL_DATA_PROVIDER,
    provider,
    chainId: ChainId.mainnet,
});

export function usePoolReserves(assetSymbol: string) {
    const [assetReserve, setAssetReserve] = useState<
        | (ReserveDataHumanized & FormatReserveUSDResponse)
        | undefined
        | null
    >(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReserves = async () => {
            const reserves = await poolDataProviderContract.getReservesHumanized({
                lendingPoolAddressProvider: markets.AaveV3Ethereum.POOL_ADDRESSES_PROVIDER,
            });

            const reservesArray = reserves.reservesData;
            const baseCurrencyData = reserves.baseCurrencyData;
            const currentTimestamp = dayjs().unix();
            const formattedPoolReserves = formatReserves({
                reserves: reservesArray,
                currentTimestamp,
                marketReferenceCurrencyDecimals:
                    baseCurrencyData.marketReferenceCurrencyDecimals,
                marketReferencePriceInUsd: baseCurrencyData.marketReferenceCurrencyPriceInUsd,
            });

            const assetReserve = formattedPoolReserves.find(
                (reserve) => reserve.symbol === assetSymbol
            );
            setAssetReserve(assetReserve);
            setLoading(false);
        };

        fetchReserves();
    }, [assetSymbol]);

    return { assetReserve, loading };
}

