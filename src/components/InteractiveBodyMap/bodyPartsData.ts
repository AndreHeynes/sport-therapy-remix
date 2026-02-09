export interface BodyPart {
  id: string;
  name: string;
  conditions: { name: string; description: string }[];
  x: number;
  y: number;
}

export const createBodyParts = (t: (key: string) => string, language: string): BodyPart[] => [
  {
    id: 'head',
    name: t('body.head'),
    x: 50,
    y: 8,
    conditions: [
      {
        name: t('conditions.headaches'),
        description: language === 'sk'
          ? 'Tenzné bolesti hlavy, migrény a cervikogénne bolesti hlavy'
          : 'Tension headaches, migraines and cervicogenic headaches'
      }
    ]
  },
  {
    id: 'neck',
    name: t('body.neck'),
    x: 50,
    y: 16,
    conditions: [
      {
        name: t('conditions.neck-pain'),
        description: language === 'sk'
          ? 'Akútna a chronická bolesť krku, stuhnutosť a whiplash'
          : 'Acute and chronic neck pain, stiffness and whiplash'
      }
    ]
  },
  {
    id: 'shoulder',
    name: t('body.shoulder'),
    x: 30,
    y: 22,
    conditions: [
      {
        name: t('conditions.shoulder-impingement'),
        description: language === 'sk'
          ? 'Impingement ramena, rotátorová manžeta a zamrznuté rameno'
          : 'Shoulder impingement, rotator cuff and frozen shoulder'
      }
    ]
  },
  {
    id: 'back',
    name: t('body.back'),
    x: 50,
    y: 38,
    conditions: [
      {
        name: t('conditions.back-pain'),
        description: language === 'sk'
          ? 'Bolesť horného a dolného chrbta, hernia disku, ischias'
          : 'Upper and lower back pain, disc herniation, sciatica'
      }
    ]
  },
  {
    id: 'hip',
    name: t('body.hip'),
    x: 35,
    y: 52,
    conditions: [
      {
        name: language === 'sk' ? 'Bolesť bedra' : 'Hip Pain',
        description: language === 'sk'
          ? 'Artróza bedra, bursitída, syndróm iliotibálneho pásma'
          : 'Hip arthritis, bursitis, iliotibial band syndrome'
      }
    ]
  },
  {
    id: 'knee',
    name: t('body.knee'),
    x: 40,
    y: 70,
    conditions: [
      {
        name: t('conditions.knee-pain'),
        description: language === 'sk'
          ? 'Poranenie väzov, meniskus, patelofemorálny syndróm'
          : 'Ligament injuries, meniscus, patellofemoral syndrome'
      }
    ]
  },
  {
    id: 'ankle',
    name: t('body.ankle'),
    x: 40,
    y: 88,
    conditions: [
      {
        name: t('conditions.ankle-sprain'),
        description: language === 'sk'
          ? 'Podvrtnutie členka, Achillova tendinitída, plantárna fasciitída'
          : 'Ankle sprain, Achilles tendinitis, plantar fasciitis'
      }
    ]
  },
  {
    id: 'elbow',
    name: t('body.elbow'),
    x: 22,
    y: 40,
    conditions: [
      {
        name: language === 'sk' ? 'Bolesť lakťa' : 'Elbow Pain',
        description: language === 'sk'
          ? 'Tenisový a golfový lakeť, burzitída'
          : 'Tennis and golfer\'s elbow, bursitis'
      }
    ]
  },
  {
    id: 'wrist',
    name: t('body.wrist'),
    x: 18,
    y: 52,
    conditions: [
      {
        name: language === 'sk' ? 'Bolesť zápästia' : 'Wrist Pain',
        description: language === 'sk'
          ? 'Syndróm karpálneho tunela, tendinitída, De Quervainov syndróm'
          : 'Carpal tunnel syndrome, tendinitis, De Quervain\'s syndrome'
      }
    ]
  }
];
