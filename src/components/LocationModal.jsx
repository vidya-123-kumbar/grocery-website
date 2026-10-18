import React, { useState } from 'react';
import { X, MapPin, Check, Search } from 'lucide-react';

export const LocationModal = ({ isOpen, onClose, selectedLocation, onSelectLocation }) => {
  if (!isOpen) return null;

  const cities = [
    { name: "Bengaluru", state: "Karnataka", active: true },
    { name: "Hubballi", state: "Karnataka", active: true },
    { name: "Dharwad", state: "Karnataka", active: true },
    { name: "Mysuru", state: "Karnataka", active: true },
    { name: "Mangaluru", state: "Karnataka", active: true },
    { name: "Hyderabad", state: "Telangana", active: true },
    { name: "Chennai", state: "Tamil Nadu", active: true },
  ];

  const bengaluruAreas = [
    "Indiranagar",
    "Koramangala",
    "Whitefield",
    "HSR Layout",
    "Jayanagar",
    "Malleshwaram",
    "Electronic City",
    "Hebbal",
    "BTM Layout"
  ];

  const [activeCity, setActiveCity] = useState(
    selectedLocation?.city || "Bengaluru"
  );
  const [filterText, setFilterText] = useState("");

  const handleAreaSelect = (area) => {
    onSelectLocation({ city: activeCity, area: area });
    onClose();
  };

  const handleCitySelect = (cityName) => {
    setActiveCity(cityName);
    if (cityName !== "Bengaluru") {
      onSelectLocation({ city: cityName, area: "City Center" });
      onClose();
    }
  };

  const filteredAreas = bengaluruAreas.filter((a) =>
    a.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 animate-scaleUp"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-brand-700">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-lg">Where should we deliver?</h3>
              <p className="text-xs text-slate-500">Select your city and area for accurate delivery slot times</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-200/60 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* City Selection */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2.5">
              Available Cities
            </label>
            <div className="flex flex-wrap gap-2">
              {cities.map((city) => {
                const isSelected = activeCity === city.name;
                return (
                  <button
                    key={city.name}
                    onClick={() => handleCitySelect(city.name)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all ${
                      isSelected
                        ? 'bg-brand-700 text-white border-brand-700 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-brand-500 hover:text-brand-700'
                    }`}
                  >
                    {city.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Area Selection for Bengaluru */}
          {activeCity === "Bengaluru" ? (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                  Select Bengaluru Neighborhood
                </label>
                <span className="text-xs text-brand-600 font-medium">10-30 min delivery</span>
              </div>

              {/* Area search */}
              <div className="relative mb-3">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search locality in Bengaluru..."
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-600 focus:bg-white transition-all"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {filteredAreas.map((area) => {
                  const isSelected =
                    selectedLocation?.city === "Bengaluru" &&
                    selectedLocation?.area === area;
                  return (
                    <button
                      key={area}
                      onClick={() => handleAreaSelect(area)}
                      className={`flex items-center justify-between p-2.5 rounded-xl border text-left text-xs font-medium transition-all ${
                        isSelected
                          ? 'border-brand-600 bg-brand-50/80 text-brand-900 font-semibold'
                          : 'border-slate-200 hover:border-brand-400 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <span className="truncate">{area}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-brand-600 flex-shrink-0 ml-1" />}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <p className="text-sm text-slate-600">
                Delivering to <strong>{activeCity}</strong> (Express Slot Available).
              </p>
              <button
                onClick={() => handleAreaSelect("Standard Coverage")}
                className="mt-3 px-4 py-2 bg-brand-700 text-white text-xs font-semibold rounded-lg hover:bg-brand-800 transition-colors"
              >
                Confirm {activeCity}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
