import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Error from './Error';
import useSelectCoins from '../hooks/useSelectCoins';
import { coins } from '../data/coins';

const InputSubmit = styled.input`
	background-color: #9497ff;
	border: none;
	width: 100%;
	padding: 10px;
	color: #fff;
	font-weight: 700;
	text-transform: uppercase;
	font-size: 20px;
	border-radius: 5px;
	transition: background-color 0.3s ease;
	margin-top: 30px;
	&:hover {
		background-color: #7a7dfe;
		cursor: pointer;
	}
`;

const cryptocurrencyForm = ({ setCoins }) => {
	const [crypto, setCrypto] = useState([]);
	const [error, setError] = useState(false);

	const [coin, SelectCoins] = useSelectCoins('Elige tu Moneda', coins);
	const [cryptocurrency, SelectCryptocurrency] = useSelectCoins(
		'Elige tu Criptomoneda',
		crypto
	);

	useEffect(() => {
		const queryAPI = async () => {
			const url =
				'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD';
			const response = await fetch(url);
			const result = await response.json();

			const arrayCrypto = result.Data.map((item) => {
				const objectCryptocurrency = {
					id: item.CoinInfo.Name,
					nombre: item.CoinInfo.FullName,
				};
				return objectCryptocurrency;
			});

			setCrypto(arrayCrypto);
		};
		queryAPI();
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();

		if ([coin, cryptocurrency].includes('')) {
			setError(true);
			return;
		}

		setError(false);
		setCoins({
			coin,
			cryptocurrency,
		});
	};

	return (
		<>
			{error && <Error>Todos los campos son obligatorios</Error>}

			<form onSubmit={handleSubmit}>
				<SelectCoins />
				<SelectCryptocurrency />

				<InputSubmit type="submit" value="Cotizar" />
			</form>
		</>
	);
};

export default cryptocurrencyForm;
