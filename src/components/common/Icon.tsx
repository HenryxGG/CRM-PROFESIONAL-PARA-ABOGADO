import React from 'react';

interface IconProps {
    name: string;
    className?: string;
    size?: number | string;
}

/**
 * Componente de icono estandarizado para proteger contra traducciones automáticas del navegador.
 * Utiliza Material Symbols Outlined.
 */
const Icon: React.FC<IconProps> = ({ name, className = '', size }) => {
    const style = size ? { fontSize: typeof size === 'number' ? `${size}px` : size } : {};

    return (
        <span
            className={`material-symbols-outlined notranslate ${className}`}
            translate="no"
            aria-hidden="true"
            style={style}
        >
            {name}
        </span>
    );
};

export default Icon;
