import React from 'react';

const PolishControls = ({ 
  type,           // 'straight', 'corner', 'uShape'
  data,           // данные полировки для текущего типа
  onToggle,       // функция переключения
  dimensions      // размеры для отображения
}) => {
  
  // Компонент для отображения секции в стандартном горизонтальном формате (Сторона 1)
  const PolishSectionHorizontal = ({ title, polish, onPolishToggle, lengths, showDimensions = true }) => {
    return (
      <div className="polish-section-horizontal">
        <h4>{title}</h4>
        <div className="polish-rectangle">
          <button 
            type="button" 
            className={`polish-side top ${polish.top ? 'active' : ''}`} 
            onClick={() => onPolishToggle('top')}
          >
             Задний торец
            <span className="side-length">{lengths.top || '—'}</span>
          </button>
          <div className="polish-middle">
            <button 
              type="button" 
              className={`polish-side left ${polish.left ? 'active' : ''}`} 
              onClick={() => onPolishToggle('left')}
            >
              Левый торец
              <span className="side-length">{lengths.left || '—'}</span>
            </button>
            <div className="polish-center">{title}</div>
            <button 
              type="button" 
              className={`polish-side right ${polish.right ? 'active' : ''}`} 
              onClick={() => onPolishToggle('right')}
            >
              Правый торец
              <span className="side-length">{lengths.right || '—'}</span>
            </button>
          </div>
          <button 
            type="button" 
            className={`polish-side bottom ${polish.bottom ? 'active' : ''}`} 
            onClick={() => onPolishToggle('bottom')}
          >
            Передний торец
            <span className="side-length">{lengths.bottom || '—'}</span>
          </button>
        </div>
        {showDimensions && (
          <div className="polish-dimensions-info">
            <span>📏 Длина: {lengths.top || '—'}</span>
            <span>📐 Ширина: {lengths.left || '—'}</span>
          </div>
        )}
      </div>
    );
  };

  // Компонент для вертикального формата (Сторона 2) - длинные вертикальные кнопки для длины
  const PolishSectionVertical = ({ title, polish, onPolishToggle, lengths }) => {
    return (
      <div className="polish-section-vertical">
        <h4>{title}</h4>
        <div className="polish-vertical-layout">
          {/* Верхний торец (ширина) - сверху */}
          <div className="polish-vertical-top">
            <button 
              type="button" 
              className={`polish-side-short top ${polish.top ? 'active' : ''}`} 
              onClick={() => onPolishToggle('top')}
            >
              <span className="side-label">Задний торец</span>
              <span className="side-length-short">{lengths.top || '—'}</span>
            </button>
          </div>
          
          {/* Левая и правая кнопки (длина) - по бокам */}
          <div className="polish-vertical-sides">
            <button 
              type="button" 
              className={`polish-side-long left ${polish.left ? 'active' : ''}`} 
              onClick={() => onPolishToggle('left')}
            >
              <span className="side-label">Левый торец</span>
              <span className="side-length-long">{lengths.left || '—'}</span>
            </button>
            <div className="polish-vertical-center">{title}</div>
            <button 
              type="button" 
              className={`polish-side-long right ${polish.right ? 'active' : ''}`} 
              onClick={() => onPolishToggle('right')}
            >
              <span className="side-label">Правый торец</span>
              <span className="side-length-long">{lengths.right || '—'}</span>
            </button>
          </div>
          
          {/* Нижний торец (ширина) - снизу */}
          <div className="polish-vertical-bottom">
            <button 
              type="button" 
              className={`polish-side-short bottom ${polish.bottom ? 'active' : ''}`} 
              onClick={() => onPolishToggle('bottom')}
            >
              <span className="side-label">Передний торец</span>
              <span className="side-length-short">{lengths.bottom || '—'}</span>
            </button>
          </div>
        </div>
        <div className="polish-dimensions-info-vertical">
          <span>📏 Длина (лево/право): {lengths.left || '—'}</span>
          <span>📐 Ширина (верх/низ): {lengths.top || '—'}</span>
        </div>
      </div>
    );
  };

  // Прямая столешница
  if (type === 'straight') {
    const polish = data || { top: false, bottom: false, left: false, right: false };
    
    return (
      <PolishSectionHorizontal 
        title="📏 Прямая столешница"
        polish={polish}
        onPolishToggle={(position) => onToggle('straight', null, position)}
        lengths={{
          top: dimensions.length ? `${dimensions.length} мм` : '—',
          bottom: dimensions.length ? `${dimensions.length} мм` : '—',
          left: dimensions.width ? `${dimensions.width} мм` : '—',
          right: dimensions.width ? `${dimensions.width} мм` : '—'
        }}
      />
    );
  }

  // Г-образная столешница - первая сторона горизонтально, вторая вертикально
  if (type === 'corner') {
    const side1Polish = data?.side1 || { top: false, bottom: false, left: false, right: false };
    const side2Polish = data?.side2 || { top: false, bottom: false, left: false, right: false };
    
    return (
      <div className="corner-polish-layout">
        <PolishSectionHorizontal 
          title="📐 Первая сторона (Сторона 1)"
          polish={side1Polish}
          onPolishToggle={(position) => onToggle('corner', 'side1', position)}
          lengths={{
            top: dimensions.length1 ? `${dimensions.length1} мм` : '—',
            bottom: dimensions.length1 ? `${dimensions.length1} мм` : '—',
            left: dimensions.width1 ? `${dimensions.width1} мм` : '—',
            right: dimensions.width1 ? `${dimensions.width1} мм` : '—'
          }}
        />
        <PolishSectionVertical 
          title="📐 Вторая сторона (Сторона 2)"
          polish={side2Polish}
          onPolishToggle={(position) => onToggle('corner', 'side2', position)}
          lengths={{
            top: dimensions.width2 ? `${dimensions.width2} мм` : '—',     // ширина для верх/низ
            bottom: dimensions.width2 ? `${dimensions.width2} мм` : '—',
            left: dimensions.length2 ? `${dimensions.length2} мм` : '—',  // длина для лево/право
            right: dimensions.length2 ? `${dimensions.length2} мм` : '—'
          }}
        />
      </div>
    );
  }

  // П-образная столешница - все секции горизонтально
  if (type === 'uShape') {
    const leftPolish = data?.left || { top: false, bottom: false, left: false, right: false };
    const centerPolish = data?.center || { top: false, bottom: false, left: false, right: false };
    const rightPolish = data?.right || { top: false, bottom: false, left: false, right: false };
    
    return (
      <div className="ushape-polish-layout">
        <PolishSectionHorizontal 
          title="🏠 Левая секция"
          polish={leftPolish}
          onPolishToggle={(position) => onToggle('uShape', 'left', position)}
          lengths={{
            top: dimensions.lengthLeft ? `${dimensions.lengthLeft} мм` : '—',
            bottom: dimensions.lengthLeft ? `${dimensions.lengthLeft} мм` : '—',
            left: dimensions.widthLeft ? `${dimensions.widthLeft} мм` : '—',
            right: dimensions.widthLeft ? `${dimensions.widthLeft} мм` : '—'
          }}
        />
        <PolishSectionHorizontal 
          title="🏠 Центральная секция"
          polish={centerPolish}
          onPolishToggle={(position) => onToggle('uShape', 'center', position)}
          lengths={{
            top: dimensions.lengthCenter ? `${dimensions.lengthCenter} мм` : '—',
            bottom: dimensions.lengthCenter ? `${dimensions.lengthCenter} мм` : '—',
            left: dimensions.widthCenter ? `${dimensions.widthCenter} мм` : '—',
            right: dimensions.widthCenter ? `${dimensions.widthCenter} мм` : '—'
          }}
        />
        <PolishSectionHorizontal 
          title="🏠 Правая секция"
          polish={rightPolish}
          onPolishToggle={(position) => onToggle('uShape', 'right', position)}
          lengths={{
            top: dimensions.lengthRight ? `${dimensions.lengthRight} мм` : '—',
            bottom: dimensions.lengthRight ? `${dimensions.lengthRight} мм` : '—',
            left: dimensions.widthRight ? `${dimensions.widthRight} мм` : '—',
            right: dimensions.widthRight ? `${dimensions.widthRight} мм` : '—'
          }}
        />
      </div>
    );
  }

  return null;
};

export default PolishControls;