import axios from "axios";
const api = "https://covid19.mathdro.id/api";

const form = document.querySelector(".form");
const close = document.querySelector(".close")
const errors = document.querySelector(".errors");
const results = document.querySelector(".results");
const country = document.querySelector(".country");

const total = document.querySelector(".total");
const deaths = document.querySelector(".deaths");
const recovered = document.querySelector(".recovered");
const countryName = document.querySelector(".countryName");

results.style.display = "none";

const convertNumber = n => n.toLocaleString();

const useData = res => {
	total.textContent = convertNumber(res.data.confirmed.value);
	recovered.innerHTML = convertNumber(res.data.recovered.value);
	deaths.innerHTML = convertNumber(res.data.deaths.value);
	results.style.display = "block";
	country.value = "";
}

const search = async name => {
	errors.textContent = "";
	try {
		const res = await axios.get(`${api}/countries/${name}`);
		countryName.textContent = name;
		useData(res);
	} catch (err) {
		results.style.display = "none";
		errors.textContent = `We found no data for '${name}'.`
	}
}

window.onload = async () => {
	errors.textContent = "";
	try {
		const res = await axios.get(api);
		countryName.textContent = "Global";
		useData(res);
	} catch {
		results.style.display = "none";
	}
}

const handleClick = async e => {
	e.preventDefault();
	if (!!country.value)
		search(country.value);
}

form.addEventListener("submit", (e) => handleClick(e))

close.onclick = () => window.close();
