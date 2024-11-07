import { usePoolReserves } from "../hooks/usePoolReserves";

type Props = {
    assetSymbol: string;
}
const AssetInfoCard = ({ assetSymbol }: Props) => {
  const { assetReserve, loading } = usePoolReserves(assetSymbol);
  if (loading) return <h1 className="text-center">Loading...</h1>;

  return (
      <div className="border border-primary p-3">
        <h1 className="text-center mb-4">{assetReserve?.symbol}</h1>
      <h2 className="text-center mb-4">{assetReserve?.name}</h2>
      <div className="card text-center">
        <div className="card-header bg-primary text-white">
          USDC Market Data
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Total Supplied</h5>
                  <p className="card-text">{assetReserve?.supplyCap}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Supply APY</h5>
                  {assetReserve?.supplyAPY ? (
                    <p className="card-text">
                      {(parseFloat(assetReserve.supplyAPY) * 100).toFixed(2)}%
                    </p>
                  ) : (
                    <p className="card-text">N/A</p>
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Total Borrowed</h5>
                  <p className="card-text">{assetReserve?.totalDebt}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Borrow APY</h5>
                  {assetReserve?.variableBorrowAPY ? (
                    <p className="card-text">
                      {(
                        parseFloat(assetReserve.variableBorrowAPY) * 100
                      ).toFixed(2)}
                      %
                    </p>
                  ) : (
                    <p className="card-text">N/A</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetInfoCard;
