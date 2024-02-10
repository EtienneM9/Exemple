import React, { useState, useEffect } from 'react';
//voici un bout de code représentant la vérification de compatibilité entre médicaments
//en utilisant l'api vidal
//Le code n'est pas fonctionnel car nous n'avons pas encore de clé d'api.


//fonctionnement:
// dès qu'un lédicament de la liste change, le useeffect est déclancher
//Celui ci vas alors utiliser vidal pour vérifier les compatibilités.
const MedicationCompatibility = () => {
  const [medications, setMedications] = useState([]);
  const [compatibility, setCompatibility] = useState([]);

  useEffect(() => {
    // Fonction pour vérifier la compatibilité des médicaments
    const checkMedicationCompatibility = async () => {
      try {
        // Appel à l'API Vidal pour obtenir la compatibilité des médicaments
        const response = await fetch('https://api.vidal.com/medications/compatibility', {
          method: 'POST',
          body: JSON.stringify(medications),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer API_KEY' // Remplacer API_KEY par la clé d'API Vidal
          }
        });

        // Vérification de la réponse de l'API
        if (response.ok) {
          const compatibilityData = await response.json();
          setCompatibility(compatibilityData);
        } else {
          console.error('Erreur lors de la vérification de la compatibilité des médicaments');
        }
      } catch (error) {
        console.error('Erreur lors de la communication avec l\'API Vidal', error);
      }
    };

    // Appel de la fonction de vérification de la compatibilité des médicaments
    checkMedicationCompatibility();
  }, [medications]);

  const handleMedicationChange = (event) => {
    const selectedMedications = Array.from(event.target.selectedOptions, (option) => option.value);
    setMedications(selectedMedications);
  };

  return (
    <div>
      <h2>Vérification de la compatibilité des médicaments</h2>
      <select multiple onChange={handleMedicationChange}>
        <option value="medication1">Médicament 1</option>
        <option value="medication2">Médicament 2</option>
        <option value="medication3">Médicament 3</option>
        {/* Ajoutez d'autres options de médicaments selon les besoins */}
      </select>
      <div>
        <h3>Résultat de la compatibilité des médicaments :</h3>
        <ul>
          {compatibility.map((medication) => (
            <li key={medication.id}>{medication.name} - {medication.compatibility}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MedicationCompatibility;
