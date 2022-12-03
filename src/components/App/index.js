import { useCallback, useEffect, useMemo, useState } from 'react';
import { FaSistrix } from "react-icons/fa";
import DATA from '../../core/data';
import './style.css';
import ItemCard from '../ItemCard';
import Filter from '../Filter';

const sleep = () => new Promise(res => setTimeout(res, 1000));

const App = () => {

  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');

  const [loading, setLoading] = useState(true);

  const searchableFields = useMemo(() => ['name', 'address'], []);

  const filters = useMemo(() => [
    {
      key: 'location',
      title: 'Location',
      options: ['New York, USA', 'Texas, USA', 'California, USA', 'Ohio, USA'],
    },
    {
      key: 'price',
      title: 'Price',
      options: ['$500-$1000', '$1000-$1500', '$1500-$2000', '$2000-$2500', '$2500+'],
    },
    {
      key: 'beds',
      title: 'Number of Beds',
      options: [1, 2, 3, 4],
    },
    {
      key: 'bathrooms',
      title: 'Number of Bathrooms',
      options: [1, 2, 3, 4],
    },
  ], []);

  const [selectedFilters, setSelectedFilters] = useState({
    location: [],
    price: [],
    beds: [],
    bathrooms: []
  });

  const init = useCallback(async () => {
    await sleep();
    setData(DATA);
    setLoading(false);
  }, []);

  useEffect(() => {
    init();
  }, [init]);

  const getRange = (option) => {
    switch(option) {
      case '$500-$1000':
        return [500, 1000];
      case '$1000-$1500':
        return [1000, 1500];
      case '$1500-$2000':
        return [1500, 2000];
      case '$2000-$2500':
        return [2000, 2500];
      case '$2500+':
        return [2500, 10000];
      default:
        return [2500, 10000];
    }
  };

  const filteredData = useMemo(() => {
    return data.filter(elem => {
      return searchableFields.reduce((prev, curr) => {
        return prev || elem[curr].toLowerCase().includes(searchText.toLowerCase());
      }, false);
    }).filter(elem => {
      let ans = true;
      for(const key in selectedFilters) {
        if(selectedFilters[key].length === 0) continue;
        if(key === 'price') {
          let temp = false;
          for(let i=0; i<selectedFilters[key].length; ++i) {
            const [low, high] = getRange(selectedFilters[key][i]);
            if(elem.price >= low && elem.price <= high) {
              temp = true;
              break;
            }
          }
          if(!temp) {
            ans = false;
            break;
          }
        } else {
          if(!selectedFilters[key].includes(elem[key])) {
            ans = false;
            break;
          }
        }
      }
      return ans;
    });
  }, [searchText, data, searchableFields, selectedFilters]);

  return (
    <div className="container wrapper">
      <div className="row">
        <p className="title col-md-8">Search properties to rent</p>
        <div className="searchBarContainer col-md-4">
          <input type="text" value={searchText} placeholder="Search for properties" onChange={e => setSearchText(e.target.value)} />
          <FaSistrix className="searchIcon" />
        </div>
      </div>
      <div className="filterContainer row">
        {
          filters.map(elem => <Filter data={elem} key={elem.key} selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />)
        }
      </div>
      <div className="row dataContainer">
        {
          loading ? (
            <div className="loader" />
          ) :
          filteredData.length ? (
            filteredData.map(item => <ItemCard key={item._id} data={item} />)
          ) : 
          (
            <div className="noData">No properties found</div>
          )
        }
      </div>
    </div>
  );
};

export default App;