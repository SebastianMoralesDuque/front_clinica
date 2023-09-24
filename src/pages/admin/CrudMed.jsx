import React from 'react';

function CrudMed() {
    // Datos de ejemplo para la tabla. En un escenario real, estos datos podrían venir de una API o base de datos.
    const medicos = [
        {
            id: 1,
            nombre: 'Dr. Juan Pérez',
            telefono: '123-456-7890',
            especialidad: 'Cardiología',
            ciudad: 'Bogotá',
            horaInicio: '08:00 AM',
            horaFin: '04:00 PM',
            estado: 'Activo',
            foto: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAAB+CAMAAACNgsajAAAAeFBMVEUflsX////19fX29vbw8PDv7+/8/Pzo6Oj09PTs7Ozj4+P5+fkAkcPg4OAAj8IAjcH/+vdPpMzX5OtAn8qexNrs6OXi6e1bpsusz+PS3uUxmcZmrM749PHu9fnh7PTb4ON3ttaPu9PA1uLP4u2nxtiFvNmyzduVxN4fVQoYAAAHFklEQVRogdVaiZKzrBJlUzESJRqNoySTdeb93/CCuKDBBDN+9delrJoiTB+habpPtwDoBTDw4Ab7Gx9vINE95G99vP1wbAM8ikJEPUwJJhR56tE9j+DwwzEQoCiIaOCT0A+JH1LZQ7rn+Z+OgXYZW+xvoVxGtyhoLHHxmJ4p6t449GBI4IdjPiBaFUg+UjeqJ5+25304BsxdREGzi0Tt4ma6w3IsnBmbyG2A/nXTSgQjC9m2aDQ4fqenr/T0jaPcHJuRA0hZAcXKJnBnIU1P2wsX6f28qwCLkyRmoNqdyxSL1pbm5IDvKU1HgbIJGkat3mUPS3sRxT5jMTAbYyy7HHnwSg4om/AnNtH3HowBS2PsoZQ5KwdaK7BYCL/aIRvY5Cbm5FAAem0og1A20emG75M5SNWSvbDLyR/k7kfmLkqbiPQu/savMAGI97lVLpTLh562vga7sbdQ2Ru8v8GUqFfvWU5iI+WlzLPQHhVEi1l1GootnuVkjyAwPrVyGU1PHN5jAlDzqVx79ofjZnqb9OUmdS1Jp3Lazuz+FDpNVE5V2P1pdyJJaxNY9Y5vd6mdajGW6zz/JNbo3t5hm1RjZT6S65bf/EX9r43vyndumADsRnL9MZXz77ws6nxu4YoJQGHK6RBIifJS0zNMb46rl+u/YtvZ15Fra3obfnEHLcVTNAxh609HEVec3UHP3LTIQFsWQI1O6eBtEBHO+wTAgQ9yPadodh+ikU1ElTvojpi21C1/ckzV/xQLQCs6yPUBAAwxruNEaIFFSZuacimiuBTFKnJpTUfNGV4G6vVyKGjjH4Dhk5f6ct58uf2nWS41eCnVS5eAfnm9HO79qfb8pNWpevAi0JR2crSPf7YYtWT5cepbYtQG6WhqeJvU0Zvq5Yd2LzVmT5gsWz4eLHLgUqZ/0Zb17Y4pTWqQG7zUlBPJ3nEBZlU8HVPNpQYv1b4xcwfNsCE3cCnSBD0z/vHaHfTAx3FT69TCpJc46b2YMmkbl5K9JeHkJxrkWjvFmktN+DVyIVIt6HHK57WXws9cyo1JqXaAz1xKLf/ZS3nw7kwmplzK4qV6v+h4UONwLGdyKazVOuiGP5ymys5iLKeNE3fLnySuhRuVLCZy23b59hTZKfSzB7el1jKaouZEoY6lEw81q3Gk509yOu5bGIpiGv57NslK71mu6dm4lO69s1VWb6xyDZlorXdyBqLgrQMs7HLaS7VswMh8Gt2I18lEklK7XMelpkxasxjyCjW5RnNyXsulyLS+1Djy/DQPen0h13GpNu7jIXNreqfMnppnKX8lB0ZxZHSG1S7gh0UFySWk/iu5mYwP96W3r0Mynm1yOOWjwsxcxmetLyn1R4HPvx6srSaov+cT78dm5HRdivb8dKyblmep4syj3u0O5/LGBTbH7HJz+X7DibrIg/0AcgEF6cfUguflei71XGEQMC/8mbEC5tHcmOJSlBgG0dmS4N51f65YyZ/GpC2JPavq/Y1wjMlkjNozPugJeH1krNmd+EHotKITwcbZMhZnj1vIfUvGN+FSEfwu62QIUaz6yc3UI8qhUVlicXK4H3NqqUsN7yD4Wk/MEsTZPqWezz1fCBim+2pyHFhSX0M4qiWYOuXepbKFUbnOw2O/L3/PdRXbzm1clUR0pxV1XkpbyB7Me3vGGJsvqEnBMrd4KT7jPFwb230Jo3reZKz8xykov2rJj0Adl9K8/HVhzxF1r2NTy6VEuQKm3LALb7mUtAL/ugqmCjJey6XkyfrTFpmNhdgjqFn+Ao7/DvScay4lz91qoDKrVmQCU1GvCVrzJuNblOC9bwWWXCoqV5yoSoKUndIFBSOXVsuZ4nDViSrWSkCwluF3Lb7K5f+uPdNLDuh6lt+2OgLegnKZW8skl1pZpdKrbIBb8X0R6BFcF5R23Fp8A2t6E93YD3Ctvi8ALcHaZipBf8Hv2pgyZQWr2/6/AZWQzuWS/xx0ZRet2u5fgGZgQbHQHXR1zwf+BeT/Eyh4QfP/0Mr1nfQdwMfKqOysUh5b8eHzlpyJyvjEmhqI7xA33/j4abfSdrGsEE1dSuX7/G7NH5dCVqUIR9Xze/ZH1coE1VdfpqMh48OC3J4S6AWTlKm0hMBmXUpXD0hR7j7BjZPd/ejnczcRckh+HtWrdHk6Q8aq8xXlo7Lctv0aOVTPfQGPP2WdVSx+lYozOQyy+nIrBPTaChrVXyONmwh0uFGASMTFMb3ef8+HQ1ZVqlySqAtDcfOeLNvV50t5TQvORUTHNxFULR2Nq5JmfcmPNlAIGITH7+L0dUqb57s4fpMogDwfalZTOfO+VNDVl3yjwt7WMfUFsee7VDNywLj9hYzbX3hyM2zJGHlxC0l/EPpkbObjwd/u5Y3r/KE/ulHw6Zj+xme59xQiGn44Nq6eD3XrYYmfjP0PekeaT/4S/w4AAAAASUVORK5CYII='
        },
        {
            id: 2,
            nombre: 'Dra. María Rodríguez',
            telefono: '987-654-3210',
            especialidad: 'Neurología',
            ciudad: 'Medellín',
            horaInicio: '09:00 AM',
            horaFin: '05:00 PM',
            estado: 'Inactivo',
            foto: 'data:image/png;base64,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'
        },
        {
            id: 3,
            nombre: 'Dr. Carlos Sánchez',
            telefono: '456-789-0123',
            especialidad: 'Pediatría',
            ciudad: 'Cali',
            horaInicio: '10:00 AM',
            horaFin: '06:00 PM',
            estado: 'Activo',
            foto: 'data:image/png;base64,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'
        },
        {
            id: 4,
            nombre: 'Dra. Laura Torres',
            telefono: '321-654-9870',
            especialidad: 'Dermatología',
            ciudad: 'Cartagena',
            horaInicio: '11:00 AM',
            horaFin: '07:00 PM',
            estado: 'Activo',
            foto: 'data:image/png;base64,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'
        }, 
        // ... otros médicos
    ]; 

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h2 className="text-2xl mb-6 text-center">Gestión de Médicos</h2>

            <div className="mb-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Crear</button>
                <button className="bg-green-500 text-white px-4 py-2 rounded mr-2">Listar</button>
            </div>

            <table className="min-w-full bg-white rounded-lg shadow-md">
                <thead>
                    <tr className="bg-gray-300 text-gray-700">
                        <th className="p-4">Nombre</th>
                        <th className="p-4">Teléfono</th>
                        <th className="p-4">ID</th>
                        <th className="p-4">Foto</th>
                        <th className="p-4">Especialidad</th>
                        <th className="p-4">Ciudad</th>
                        <th className="p-4">Hora Inicio</th>
                        <th className="p-4">Hora Fin</th>
                        <th className="p-4">Estado</th>
                        <th className="p-4">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {medicos.map(medico => (
                        <tr key={medico.id} className="border-b">
                            <td className="p-4">{medico.nombre}</td>
                            <td className="p-4">{medico.telefono}</td>
                            <td className="p-4">{medico.id}</td>
                            <td className="p-4"><img src={medico.foto} alt="Foto del médico" className="w-10 h-10 rounded-full" /></td>
                            <td className="p-4">{medico.especialidad}</td>
                            <td className="p-4">{medico.ciudad}</td>
                            <td className="p-4">{medico.horaInicio}</td>
                            <td className="p-4">{medico.horaFin}</td>
                            <td className="p-4">{medico.estado}</td>
                            <td className="p-4">
                                <button className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Modificar</button>
                                <button className="bg-red-500 text-white px-2 py-1 rounded">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CrudMed;
