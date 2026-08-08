import React, { useState, useEffect } from 'react';

const MaterialCostCalculator = ({ fabricationCost = 0, markupPercentage = 20 }) => {
  const [materialCost, setMaterialCost] = useState('');
  const [materialCostWithMarkup, setMaterialCostWithMarkup] = useState(0);
  const [totalWithMaterial, setTotalWithMaterial] = useState(0);

  useEffect(() => {
    const cost = parseFloat(materialCost);
    const fabCost = parseFloat(fabricationCost) || 0;
    
    if (!isNaN(cost) && cost > 0) {
      const markup = cost * (markupPercentage / 100);
      const materialTotal = cost + markup;
      setMaterialCostWithMarkup(materialTotal);
      setTotalWithMaterial(fabCost + materialTotal);
    } else {
      setMaterialCostWithMarkup(0);
      setTotalWithMaterial(fabCost);
    }
  }, [materialCost, fabricationCost, markupPercentage]); // ← добавили markupPercentage в зависимости

  const handleMaterialCostChange = (e) => {
    const value = e.target.value;
    setMaterialCost(value);
  };

  const fabCost = parseFloat(fabricationCost) || 0;

  return (
    <div className="material-cost-calculator">
      <h3 className="material-cost-title">💰 Стоимость материала</h3>
      
      <div className="material-cost-input-group">
        <label htmlFor="materialCost">Стоимость материала ($)</label>
        <input
          type="number"
          id="materialCost"
          value={materialCost}
          onChange={handleMaterialCostChange}
          placeholder="Введите стоимость материала"
          step="10"
          min="0"
        />
      </div>
      
      {materialCost && parseFloat(materialCost) > 0 && (
        <div className="material-cost-result">
          <div className="material-cost-row">
            <span>💰 Стоимость материала:</span>
            <span>{parseFloat(materialCost).toFixed(2)} $</span>
          </div>
          <div className="material-cost-row markup">
            <span>📈 Наценка ({markupPercentage}%):</span> {/* ← теперь показывает правильный процент */}
            <span>{(parseFloat(materialCost) * (markupPercentage / 100)).toFixed(2)} $</span>
          </div>
          <div className="material-cost-row total-material">
            <span>💎 Итого стоимость материала с наценкой:</span>
            <span>{materialCostWithMarkup.toFixed(2)} $</span>
          </div>
        </div>
      )}
      
      <div className="material-cost-divider"></div>
      
      <div className="material-cost-final-total">
        <div className="final-total-row">
          <span>🔧 Стоимость изготовления:</span>
          <span>{fabCost.toFixed(2)} $</span>
        </div>
        {materialCost && parseFloat(materialCost) > 0 && (
          <div className="final-total-row">
            <span>💎 Стоимость материала с наценкой ({markupPercentage}%):</span>
            <span>{materialCostWithMarkup.toFixed(2)} $</span>
          </div>
        )}
        <div className="final-total-row grand-total">
          <span>🏆 ИТОГО ПОЛНАЯ СТОИМОСТЬ:</span>
          <span>{totalWithMaterial.toFixed(2)} $</span>
        </div>
      </div>
    </div>
  );
};

export default MaterialCostCalculator;