// HL7 v2 Example Messages Collection
// Various message types and versions for testing
// Sorted alphabetically by message type

const HL7_EXAMPLES = [
    {
        id: 1,
        name: "ADT^A01 - Patient Admission (v2.5)",
        type: "ADT^A01",
        version: "2.5",
        description: "New patient admission with demographics and visit information",
        message: `MSH|^~\\&|SENDING_APP|SENDING_FACILITY|RECEIVING_APP|RECEIVING_FACILITY|20250107120000||ADT^A01|MSG00001|P|2.5
EVN|A01|20250107120000|||OPERATOR123^Smith^John
PID|1||123456789^^^HOSPITAL^MR||Doe^John^Robert||19800515|M|||123 Main Street^Apt 4B^Lisbon^Lisboa^1000-001^PT||+351912345678|+351213456789|EN|M|CAT|987654321^^^HOSPITAL^AN||123-45-6789
NK1|1|Doe^Jane^||SPOUSE|456 Oak Avenue^^Porto^^4000-001^PT|+351918765432
PV1|1|I|ICU^101^01^HOSPITAL|||DOC123^Johnson^Michael^^^Dr.|||SUR||||2|||DOC123^Johnson^Michael^^^Dr.|INP|VISIT123456|||||||||||||||||||HOSPITAL||REG|||20250107110000`
    },
    {
        id: 2,
        name: "ADT^A08 - Update Patient Info (v2.3)",
        type: "ADT^A08",
        version: "2.3",
        description: "Update patient demographic information",
        message: `MSH|^~\\&|EMR_SYSTEM|MAIN_HOSPITAL|REGISTRATION|MAIN_HOSPITAL|20250107140000||ADT^A08|MSG00002|P|2.3
EVN|A08|20250107140000|||USER456^Williams^Sarah
PID|1||987654321^^^HOSPITAL^MR||Smith^Jane^Marie||19750320|F|||789 Park Road^^Madrid^^28001^ES||+34912345678||ES|S|CAT|123456789^^^HOSPITAL^AN
PV1|1|O|CLINIC^201^||||||DOC456^Garcia^Antonio^^^Dr.|||||||DOC456^Garcia^Antonio^^^Dr.|OUT|VISIT789012`
    },
    {
        id: 3,
        name: "ADT^A03 - Patient Discharge (v2.5)",
        type: "ADT^A03",
        version: "2.5",
        description: "Patient discharge from inpatient care",
        message: `MSH|^~\\&|ADT_SYSTEM|HOSPITAL_A|EMR_SYSTEM|HOSPITAL_A|20250107160000||ADT^A03|MSG00003|P|2.5
EVN|A03|20250107160000|||NURSE789^Brown^Emily
PID|1||456789123^^^HOSPITAL_A^MR||Johnson^Robert^William||19601212|M|||321 Elm Street^^London^^SW1A 1AA^UK||+442071234567||EN|M|C|654321789^^^HOSPITAL_A^AN
PV1|1|I|WARD^305^12^HOSPITAL_A|||DOC789^Thompson^James^^^Dr.|||MED||||1|||DOC789^Thompson^James^^^Dr.|INP|VISIT345678|||||||||||||||||||HOSPITAL_A||DIS|||20250107155000`
    },
    {
        id: 4,
        name: "ORU^R01 - Lab Results (v2.5)",
        type: "ORU^R01",
        version: "2.5",
        description: "Laboratory observation results with multiple tests",
        message: `MSH|^~\\&|LAB_SYSTEM|CENTRAL_LAB|EMR_SYSTEM|HOSPITAL|20250107143000||ORU^R01|MSG00004|P|2.5
PID|1||234567890^^^HOSPITAL^MR||Martinez^Carlos^||19850730|M|||567 Beach Road^^Barcelona^^08001^ES||+34933456789
PV1|1|O|LAB^101^||||||DOC234^Lopez^Maria^^^Dr.
ORC|RE|ORDER123456|FILLER789012|GROUP456|CM||||20250107100000|||DOC234^Lopez^Maria^^^Dr.
OBR|1|ORDER123456|FILLER789012|CBC^Complete Blood Count^L|||20250107100000|||TECH123^Anderson^David|||20250107120000|||DOC234^Lopez^Maria^^^Dr.||||LAB_RESULT|||20250107143000|||F
OBX|1|NM|WBC^White Blood Cells^L||7.5|10^3/uL|4.0-11.0|N|||F|||20250107120000
OBX|2|NM|RBC^Red Blood Cells^L||4.8|10^6/uL|4.5-5.5|N|||F|||20250107120000
OBX|3|NM|HGB^Hemoglobin^L||14.2|g/dL|13.5-17.5|N|||F|||20250107120000
OBX|4|NM|HCT^Hematocrit^L||42.1|%|40-50|N|||F|||20250107120000`
    },
    {
        id: 5,
        name: "ORM^O01 - New Order (v2.4)",
        type: "ORM^O01",
        version: "2.4",
        description: "New laboratory test order",
        message: `MSH|^~\\&|CPOE_SYSTEM|HOSPITAL|LAB_SYSTEM|CENTRAL_LAB|20250107091500||ORM^O01|MSG00005|P|2.4
PID|1||345678901^^^HOSPITAL^MR||Wilson^Sarah^Ann||19920415|F|||890 River Drive^^Dublin^^D01 F5P2^IE||+35312345678
PV1|1|I|CARDIO^402^08^HOSPITAL|||DOC567^Murphy^Patrick^^^Dr.
ORC|NW|ORDER789123|||||^^^^^R||20250107091500|USER123^Kelly^Mary|||DOC567^Murphy^Patrick^^^Dr.
OBR|1|ORDER789123||LIPID^Lipid Panel^L|||20250107091500`
    },
    {
        id: 6,
        name: "SIU^S12 - Appointment Notification (v2.3)",
        type: "SIU^S12",
        version: "2.3",
        description: "New appointment booking notification",
        message: `MSH|^~\\&|SCHEDULING|HOSPITAL|EMR|HOSPITAL|20250108093000||SIU^S12|MSG00006|P|2.3
SCH|APPT789456||APPT789456|||||ROUTINE|30|MIN||||||20250115100000|20250115103000|||DOC890^Anderson^Robert^^^Dr.|+351213456789||||SCHEDULED
PID|1||567890123^^^HOSPITAL^MR||Santos^Maria^Luisa||19880620|F|||234 Coastal Road^^Faro^^8000-001^PT||+351289123456
PV1|1|O|CLINIC^303^||||||DOC890^Anderson^Robert^^^Dr.
RGS|1|A
AIG|1||DOC890^Anderson^Robert^^^Dr.||20250115100000|30|MIN|||CONFIRMED
AIL|1||CLINIC^ROOM303^HOSPITAL||20250115100000|30|MIN|||CONFIRMED`
    },
    {
        id: 7,
        name: "DFT^P03 - Post Billing (v2.5)",
        type: "DFT^P03",
        version: "2.5",
        description: "Post detail financial transaction",
        message: `MSH|^~\\&|BILLING|HOSPITAL|FINANCE|HOSPITAL|20250107170000||DFT^P03|MSG00007|P|2.5
EVN|P03|20250107170000
PID|1||678901234^^^HOSPITAL^MR||Brown^Thomas^Edward||19701108|M|||456 Hill Street^^Cork^^T12 ABC1^IE||+353214567890
PV1|1|O|RADIOLOGY^201^||||||DOC123^Murphy^John^^^Dr.
FT1|1||||||20250107150000||||||200.00^EUR|1|XRAY^Chest X-Ray`
    },
    {
        id: 8,
        name: "MDM^T02 - Document Notification (v2.5)",
        type: "MDM^T02",
        version: "2.5",
        description: "Original document notification",
        message: `MSH|^~\\&|EMR|HOSPITAL|DOC_SYSTEM|HOSPITAL|20250107143000||MDM^T02|MSG00008|P|2.5
EVN|T02|20250107143000
PID|1||789012345^^^HOSPITAL^MR||Davis^Jennifer^Marie||19830225|F|||678 Valley Road^^Edinburgh^^EH1 1AA^UK||+441312345678
PV1|1|I|MED^405^15^HOSPITAL|||DOC345^Wilson^Andrew^^^Dr.
TXA|1|DC|TX|||20250107143000||||DOC345^Wilson^Andrew^^^Dr.||||DISCHARGE_SUMMARY||AU|AV
OBX|1|TX|DISCH_SUM^Discharge Summary||Patient was admitted with acute appendicitis...||||||F`
    },
    {
        id: 9,
        name: "VXU^V04 - Vaccination Record (v2.5.1)",
        type: "VXU^V04",
        version: "2.5.1",
        description: "Unsolicited vaccination record update",
        message: `MSH|^~\\&|IMMUNIZATION|PUBLIC_HEALTH|EMR|HOSPITAL|20250107120000||VXU^V04|MSG00009|P|2.5.1
PID|1||890123456^^^NATIONAL^NI||Taylor^Emma^Grace||20150320|F|||901 Garden Lane^^Galway^^H91 ABC1^IE||+353912345678|||||||||||||||N
ORC|RE|ORDER123456||||||20250107110000
RXA|0|1|20250107110000|20250107110500|998^No Vaccine Administered^CVX|999|||01^Historical^NIP001
OBX|1|CE|30963-3^Vaccine Funding Source^LN||VFC^Vaccines for Children^HL70064||||||F`
    },
    {
        id: 10,
        name: "ADT^A04 - Register Outpatient (v2.4)",
        type: "ADT^A04",
        version: "2.4",
        description: "Register a patient for outpatient services",
        message: `MSH|^~\\&|REG_SYSTEM|HOSPITAL|EMR|HOSPITAL|20250107083000||ADT^A04|MSG00010|P|2.4
EVN|A04|20250107083000|||CLERK123^Silva^Ana
PID|1||901234567^^^HOSPITAL^MR||Oliveira^Paulo^Manuel||19780915|M|||123 Mountain View^^Coimbra^^3000-001^PT||+351239123456
PV1|1|O|ORTHO^202^||||||DOC678^Ferreira^Ricardo^^^Dr.|||||||DOC678^Ferreira^Ricardo^^^Dr.|OUT|VISIT901234`
    },
    {
        id: 11,
        name: "ORU^R01 - Microbiology Results (v2.5)",
        type: "ORU^R01",
        version: "2.5",
        description: "Microbiology culture results with sensitivities",
        message: `MSH|^~\\&|MICRO_LAB|CENTRAL_LAB|EMR|HOSPITAL|20250109100000||ORU^R01|MSG00011|P|2.5
PID|1||012345678^^^HOSPITAL^MR||Costa^Isabel^Maria||19650710|F|||456 Sea View^^Aveiro^^3800-001^PT||+351234567890
PV1|1|I|ICU^201^05^HOSPITAL|||DOC901^Santos^João^^^Dr.
ORC|RE|ORDER456789|FILLER901234|GROUP789|CM||||20250108080000
OBR|1|ORDER456789|FILLER901234|CULTURE^Blood Culture^L|||20250108080000|||||20250108090000||DOC901^Santos^João^^^Dr.||||LAB_RESULT|||20250109100000|||F
OBX|1|ST|ORGANISM^Organism^L||Staphylococcus aureus||||||F|||20250109095000
OBX|2|ST|SENSITIVITY^Antibiotic Sensitivity^L||Penicillin - Resistant||||||F|||20250109095000
OBX|3|ST|SENSITIVITY^Antibiotic Sensitivity^L||Vancomycin - Sensitive||||||F|||20250109095000`
    },
    {
        id: 12,
        name: "OMP^O09 - Pharmacy Order (v2.5)",
        type: "OMP^O09",
        version: "2.5",
        description: "Pharmacy/treatment order message",
        message: `MSH|^~\\&|PHARMACY|HOSPITAL|EMR|HOSPITAL|20250107140000||OMP^O09|MSG00012|P|2.5
PID|1||123456789^^^HOSPITAL^MR||Rodrigues^António^José||19550830|M|||789 Park Street^^Braga^^4700-001^PT||+351253123456
PV1|1|I|CARDIO^301^10^HOSPITAL|||DOC234^Almeida^Teresa^^^Dr.
ORC|NW|RX123456|||||^^^^^R||20250107140000|||DOC234^Almeida^Teresa^^^Dr.
RXO|ASPIRIN100^Aspirin 100mg^LOCAL|100||MG||PO|BID|||10||0
RXR|PO^Oral`
    },
    {
        id: 13,
        name: "ADT^A11 - Cancel Admit (v2.3)",
        type: "ADT^A11",
        version: "2.3",
        description: "Cancel patient admission",
        message: `MSH|^~\\&|ADT|HOSPITAL|EMR|HOSPITAL|20250107160000||ADT^A11|MSG00013|P|2.3
EVN|A11|20250107160000|||ADMIN456^Pereira^Carlos
PID|1||234567890^^^HOSPITAL^MR||Fernandes^Sofia^Alexandra||19900505|F|||321 River Road^^Setúbal^^2900-001^PT||+351265123456
PV1|1|I|MED^401^12^HOSPITAL|||DOC567^Carvalho^Miguel^^^Dr.|INP|VISIT234567`
    },
    {
        id: 14,
        name: "RDE^O11 - Pharmacy Encoded Order (v2.5)",
        type: "RDE^O11",
        version: "2.5",
        description: "Pharmacy/treatment encoded order",
        message: `MSH|^~\\&|CPOE|HOSPITAL|PHARMACY|HOSPITAL|20250107093000||RDE^O11|MSG00014|P|2.5
PID|1||345678901^^^HOSPITAL^MR||Gomes^Manuel^António||19721220|M|||654 Beach Road^^Portimão^^8500-001^PT||+351282123456
PV1|1|O|CLINIC^101^||||||DOC890^Martins^Ana^^^Dr.
ORC|NW|RX789012|||||^^^^^R||20250107093000|||DOC890^Martins^Ana^^^Dr.
RXE|^^^^^R|AMOXICILLIN500^Amoxicillin 500mg^LOCAL|500|MG|CAPSULE||PO|TID||7||0
RXR|PO^Oral
OBX|1|TX|INDICATION||Upper respiratory infection||||||F`
    },
    {
        id: 15,
        name: "BAR^P01 - Add Patient Account (v2.4)",
        type: "BAR^P01",
        version: "2.4",
        description: "Add patient account information",
        message: `MSH|^~\\&|FINANCE|HOSPITAL|ADT|HOSPITAL|20250107110000||BAR^P01|MSG00015|P|2.4
EVN|P01|20250107110000
PID|1||456789012^^^HOSPITAL^MR||Nunes^Cristina^Isabel||19860415|F|||987 Hill Drive^^Évora^^7000-001^PT||+351266123456
PV1|1|O|SURG^201^||||||DOC123^Sousa^Paulo^^^Dr.`
    },
    {
        id: 16,
        name: "SIU^S13 - Appointment Rescheduling (v2.5)",
        type: "SIU^S13",
        version: "2.5",
        description: "Notification of appointment rescheduling",
        message: `MSH|^~\\&|SCHEDULING|HOSPITAL|EMR|HOSPITAL|20250108140000||SIU^S13|MSG00016|P|2.5
SCH|APPT123789||APPT123789|||||ROUTINE|45|MIN||||||20250120143000|20250120151500|||DOC456^Lima^João^^^Dr.|+351217654321||||RESCHEDULED
PID|1||567890123^^^HOSPITAL^MR||Mendes^Rui^Carlos||19750825|M|||147 Lake Road^^Viseu^^3500-001^PT||+351232123456
PV1|1|O|NEURO^404^||||||DOC456^Lima^João^^^Dr.
RGS|1|U
AIG|1||DOC456^Lima^João^^^Dr.||20250120143000|45|MIN|||RESCHEDULED`
    },
    {
        id: 17,
        name: "PPR^PC1 - Patient Problem Add (v2.4)",
        type: "PPR^PC1",
        version: "2.4",
        description: "Add patient problem to problem list",
        message: `MSH|^~\\&|EMR|HOSPITAL|REGISTRY|HOSPITAL|20250107153000||PPR^PC1|MSG00017|P|2.4
PID|1||678901234^^^HOSPITAL^MR||Teixeira^Beatriz^Maria||19931010|F|||258 Forest Road^^Guarda^^6300-001^PT||+351271123456
PV1|1|O|ENDO^303^||||||DOC789^Ribeiro^Sandra^^^Dr.
PRB|ADD|20250107153000|250.00^Diabetes Mellitus Type 2^ICD10|||20250107|A|20250107|CONFIRMED`
    },
    {
        id: 18,
        name: "ORU^R30 - Observation Results (v2.6)",
        type: "ORU^R30",
        version: "2.6",
        description: "Unsolicited point-of-care observation",
        message: `MSH|^~\\&|POC_DEVICE|WARD5|EMR|HOSPITAL|20250107181500||ORU^R30|MSG00018|P|2.6
PID|1||789012345^^^HOSPITAL^MR||Soares^Diogo^Filipe||19881125|M|||369 Valley View^^Leiria^^2400-001^PT||+351244123456
PV1|1|I|MED^501^08^HOSPITAL|||DOC234^Pinto^Mariana^^^Dr.
OBR|1|||VITAL_SIGNS^Vital Signs^LOCAL|||20250107181500
OBX|1|NM|8310-5^Body Temperature^LN||37.2|Cel|36.0-37.5|N|||F|||20250107181500
OBX|2|NM|8867-4^Heart Rate^LN||78|/min|60-100|N|||F|||20250107181500
OBX|3|NM|8480-6^Systolic BP^LN||125|mm[Hg]|90-140|N|||F|||20250107181500
OBX|4|NM|8462-4^Diastolic BP^LN||82|mm[Hg]|60-90|N|||F|||20250107181500`
    },
    {
        id: 19,
        name: "ADT^A40 - Merge Patient (v2.5)",
        type: "ADT^A40",
        version: "2.5",
        description: "Merge patient information",
        message: `MSH|^~\\&|ADT|HOSPITAL|EMR|HOSPITAL|20250107200000||ADT^A40|MSG00019|P|2.5
EVN|A40|20250107200000|||ADMIN789^Moreira^Luís
PID|1||890123456^^^HOSPITAL^MR||Vieira^Inês^Catarina||19960315|F|||741 Sunset Blvd^^Funchal^^9000-001^PT||+351291123456
MRG|901234567^^^HOSPITAL^MR`
    },
    {
        id: 20,
        name: "RAS^O17 - Pharmacy Administration (v2.5)",
        type: "RAS^O17",
        version: "2.5",
        description: "Pharmacy/treatment administration",
        message: `MSH|^~\\&|PHARMACY|HOSPITAL|EMR|HOSPITAL|20250107100000||RAS^O17|MSG00020|P|2.5
PID|1||901234567^^^HOSPITAL^MR||Correia^Hugo^Miguel||19690707|M|||852 Spring Street^^Castelo Branco^^6000-001^PT||+351272123456
PV1|1|I|ONCO^601^20^HOSPITAL|||DOC567^Azevedo^Paula^^^Dr.
ORC|RE|RX901234||||||20250107095000
RXA|0|1|20250107100000|20250107100500|CHEMO123^Chemotherapy Protocol^LOCAL|100|ML|||||NURSE123^Tavares^Sofia`
    },
    {
        id: 21,
        name: "ORU^R01 - Radiology Report (v2.5)",
        type: "ORU^R01",
        version: "2.5",
        description: "Radiology observation report",
        message: `MSH|^~\\&|RAD_SYSTEM|IMAGING|EMR|HOSPITAL|20250107163000||ORU^R01|MSG00021|P|2.5
PID|1||012345678^^^HOSPITAL^MR||Matos^Filipa^Alexandra||19820918|F|||963 Mountain Road^^Bragança^^5300-001^PT||+351273123456
PV1|1|O|RAD^101^||||||DOC890^Baptista^Rui^^^Dr.
ORC|RE|ORDER567890|FILLER234567|GROUP890|CM||||20250107100000
OBR|1|ORDER567890|FILLER234567|CHEST_CT^CT Chest^L|||20250107100000|||||20250107110000||DOC890^Baptista^Rui^^^Dr.||||RAD_RESULT|||20250107163000|||F
OBX|1|TX|IMPRESSION||No acute pulmonary abnormality detected. Clear lung fields bilaterally.||||||F|||20250107162000
OBX|2|TX|FINDINGS||Heart size normal. No pleural effusion. No pneumothorax.||||||F|||20250107162000`
    },
    {
        id: 22,
        name: "SIU^S26 - Cancel Appointment (v2.5)",
        type: "SIU^S26",
        version: "2.5",
        description: "Notification of appointment cancellation",
        message: `MSH|^~\\&|SCHEDULING|HOSPITAL|EMR|HOSPITAL|20250108093000||SIU^S26|MSG00022|P|2.5
SCH|APPT456123||APPT456123|||||ROUTINE|30|MIN||||||20250115140000|20250115143000|||DOC123^Ramos^Carla^^^Dr.|+351218765432||||CANCELLED
PID|1||123456789^^^HOSPITAL^MR||Araújo^Pedro^Alexandre||19771203|M|||159 Ocean Drive^^Ponta Delgada^^9500-001^PT||+351296123456
PV1|1|O|DERM^505^||||||DOC123^Ramos^Carla^^^Dr.
RGS|1|X`
    },
    {
        id: 23,
        name: "REF^I12 - Patient Referral (v2.5)",
        type: "REF^I12",
        version: "2.5",
        description: "Patient referral to another provider",
        message: `MSH|^~\\&|EMR|CLINIC_A|EMR|HOSPITAL_B|20250107143000||REF^I12|MSG00023|P|2.5
PID|1||234567890^^^CLINIC_A^MR||Miranda^Teresa^Sofia||19680522|F|||753 Garden Road^^Santarém^^2000-001^PT||+351243123456
RF1|O|R|CARDIOLOGY^Cardiology Consultation|||20250107143000|||DOC345^Silva^Fernando^^^Dr.|+351213456789||URGENT
PRD|RP|CARDIOLOGIST|||||||||||HOSPITAL_B`
    },
    {
        id: 24,
        name: "MFN^M02 - Staff Master File (v2.4)",
        type: "MFN^M02",
        version: "2.4",
        description: "Master file notification - staff practitioner",
        message: `MSH|^~\\&|HR_SYSTEM|HOSPITAL|EMR|HOSPITAL|20250107090000||MFN^M02|MSG00024|P|2.4
MFI|STF^Staff Master File^HL70175|UPD|||AL
MFE|MUP|DOC999|20250107090000|DOC999^Monteiro^Vasco^^^Dr.
STF|DOC999^Monteiro^Vasco^^^Dr.||CARDIOLOGY||||PHYSICIAN|A|20100101|||+351219876543`
    },
    {
        id: 25,
        name: "ADT^A31 - Update Person Info (v2.5)",
        type: "ADT^A31",
        version: "2.5",
        description: "Update person information (master file)",
        message: `MSH|^~\\&|ADT_SYSTEM|HOSPITAL|MPI|HOSPITAL|20250107150000||ADT^A31|MSG00025|P|2.5
EVN|A31|20250107150000|||USER789^Costa^Manuel
PID|1||567890123^^^HOSPITAL^MR||Silva^João^Pedro||19850315|M|||456 Central Avenue^^Porto^^4000-001^PT||+351223456789||PT|M|CAT|789456123^^^HOSPITAL^AN
PD1|||PRIMARY_CARE^Family Medicine Clinic^^Porto||DOC456^Fernandes^Clara^^^Dr.|||||||A`
    },
    {
        id: 26,
        name: "OMI^O23 - Imaging Order (v2.5)",
        type: "OMI^O23",
        version: "2.5",
        description: "General clinical order for imaging",
        message: `MSH|^~\\&|CPOE|HOSPITAL|RIS|RADIOLOGY|20250107111500||OMI^O23|MSG00026|P|2.5
PID|1||890123456^^^HOSPITAL^MR||Alves^Mariana^Isabel||19920808|F|||123 River Street^^Coimbra^^3000-001^PT||+351239876543
PV1|1|O|RAD^WAITING^||||||DOC234^Sousa^Ricardo^^^Dr.
ORC|NW|ORDER567890||||||^^^^^R||20250107111500|||DOC234^Sousa^Ricardo^^^Dr.
OBR|1|ORDER567890||CHEST_XRAY^Chest X-Ray PA and Lateral^RADLEX|||20250107111500||||||||DOC234^Sousa^Ricardo^^^Dr.
NTE|1|L|Patient reports persistent cough for 2 weeks`
    },
    {
        id: 27,
        name: "OML^O21 - Lab Order (v2.5)",
        type: "OML^O21",
        version: "2.5",
        description: "Laboratory order message",
        message: `MSH|^~\\&|CPOE|HOSPITAL|LIS|LAB|20250107083000||OML^O21|MSG00027|P|2.5
PID|1||234567890^^^HOSPITAL^MR||Pereira^António^Manuel||19750920|M|||789 Park Avenue^^Lisboa^^1000-001^PT||+351213456789
PV1|1|O|LAB^COLLECTION^||||||DOC345^Martins^Sofia^^^Dr.
ORC|NW|LAB123456||||||^^^^^R||20250107083000|||DOC345^Martins^Sofia^^^Dr.
OBR|1|LAB123456||METABOLIC^Metabolic Panel^L|||20250107083000
OBX|1|NM|GLU^Glucose^L||95|mg/dL|70-100|N|||F
OBX|2|NM|BUN^Blood Urea Nitrogen^L||18|mg/dL|7-20|N|||F
OBX|3|NM|CREAT^Creatinine^L||1.1|mg/dL|0.7-1.3|N|||F`
    },
    {
        id: 28,
        name: "OML^O33 - Lab Order (v2.5)",
        type: "OML^O33",
        version: "2.5",
        description: "Laboratory order for multiple specimens",
        message: `MSH|^~\\&|CPOE|HOSPITAL|LIS|LAB|20250107095000||OML^O33|MSG00028|P|2.5
PID|1||345678901^^^HOSPITAL^MR||Santos^Beatriz^Maria||19880225|F|||321 Beach Road^^Faro^^8000-001^PT||+351289123456
ORC|NW|LAB789012||||||^^^^^R||20250107095000|||DOC678^Lima^Pedro^^^Dr.
TQ1|1||||||20250107100000|20250107103000|R
OBR|1|LAB789012||HBA1C^Hemoglobin A1c^L|||20250107100000
SPM|1|SPECIMEN001||BLD^Blood^HL70487|||||||P^Patient^HL70369
OBX|1|NM|HBA1C^Hemoglobin A1c^L||6.2|%|<5.7|H|||F`
    },
    {
        id: 29,
        name: "QBP^Q11 - Query by Parameter (v2.5)",
        type: "QBP^Q11",
        version: "2.5",
        description: "Query for patient demographics",
        message: `MSH|^~\\&|EMR_QUERY|HOSPITAL|MPI|HOSPITAL|20250107140000||QBP^Q11|MSG00029|P|2.5
QPD|Q22^Find Candidates^HL7nnnn|QUERY001|@PID.5.1^Silva~@PID.7^19850315~@PID.8^M
RCP|I|10^RD`
    },
    {
        id: 30,
        name: "QBP^Q22 - Patient Demographics Query (v2.5)",
        type: "QBP^Q22",
        version: "2.5",
        description: "Find candidates query for patient search",
        message: `MSH|^~\\&|EMR|HOSPITAL|MPI|HOSPITAL|20250107143000||QBP^Q22|MSG00030|P|2.5
QPD|Q22^Find Candidates^HL7nnnn|QUERY002|@PID.5.1^Pereira~@PID.7^19750920
RCP|I|20^RD
DSC|CONTINUE001`
    },
    {
        id: 31,
        name: "QBP^Q25 - Pharmacy Dispense Query (v2.5)",
        type: "QBP^Q25",
        version: "2.5",
        description: "Query for pharmacy dispense history",
        message: `MSH|^~\\&|PHARMACY|HOSPITAL|EMR|HOSPITAL|20250107160000||QBP^Q25|MSG00031|P|2.5
QPD|Q25^Dispense History^HL7nnnn|QUERY003|123456789^^^HOSPITAL^MR|20250101|20250107
RCP|I|50^RD`
    },
    {
        id: 32,
        name: "RSP^K11 - Query Response (v2.5)",
        type: "RSP^K11",
        version: "2.5",
        description: "Response to patient demographics query",
        message: `MSH|^~\\&|MPI|HOSPITAL|EMR_QUERY|HOSPITAL|20250107140030||RSP^K11|MSG00032|P|2.5
MSA|AA|MSG00029
QAK|QUERY001|OK|Q22^Find Candidates^HL7nnnn|2
QPD|Q22^Find Candidates^HL7nnnn|QUERY001|@PID.5.1^Silva~@PID.7^19850315~@PID.8^M
PID|1||567890123^^^HOSPITAL^MR||Silva^João^Pedro||19850315|M|||456 Central Avenue^^Porto^^4000-001^PT||+351223456789
PID|2||678901234^^^HOSPITAL^MR||Silva^João^Miguel||19850315|M|||789 North Street^^Lisboa^^1000-001^PT||+351214567890`
    },
    {
        id: 33,
        name: "OML^O35 - Lab Order with Specimen (v2.5.1)",
        type: "OML^O35",
        version: "2.5.1",
        description: "Laboratory order with specimen routing",
        message: `MSH|^~\\&|CPOE|HOSPITAL|LIS|CENTRAL_LAB|20250107120000||OML^O35|MSG00033|P|2.5.1
PID|1||456789012^^^HOSPITAL^MR||Rodrigues^Carla^Sofia||19810512|F|||654 Mountain View^^Braga^^4700-001^PT||+351253789012
ORC|NW|LAB345678||||||^^^^^R||20250107120000|||DOC890^Almeida^Tiago^^^Dr.
OBR|1|LAB345678||THYROID^Thyroid Panel^L|||20250107120000
SPM|1|SPEC001||SER^Serum^HL70487|||||||P^Patient^HL70369
SAC|TUBE001||SERUM_SEPARATOR||1|SAMPLE
OBX|1|NM|TSH^Thyroid Stimulating Hormone^L||2.5|mIU/L|0.4-4.0|N|||F
OBX|2|NM|T4^Thyroxine^L||8.2|ug/dL|4.5-12.0|N|||F`
    },
    {
        id: 34,
        name: "ADT^A08 - Update Allergies (v2.5)",
        type: "ADT^A08",
        version: "2.5",
        description: "Update patient information with allergy data",
        message: `MSH|^~\\&|EMR|HOSPITAL|ADT|HOSPITAL|20250107153000||ADT^A08|MSG00034|P|2.5
EVN|A08|20250107153000|||NURSE456^Oliveira^Paula
PID|1||678901234^^^HOSPITAL^MR||Costa^Miguel^Alexandre||19730610|M|||987 Valley Road^^Évora^^7000-001^PT||+351266345678
PV1|1|O|ALLERGY_CLINIC^201^||||||DOC123^Ribeiro^Ana^^^Dr.
AL1|1|DA|PENICILLIN^Penicillin^RxNorm|SV|Severe rash and difficulty breathing|20250107
AL1|2|FA|PEANUTS^Peanuts^SNOMED|MO|Anaphylaxis|20230315`
    },
    {
        id: 35,
        name: "ADT^A40 - Merge Patient - Advanced (v2.5)",
        type: "ADT^A40",
        version: "2.5",
        description: "Merge patient records with visit information",
        message: `MSH|^~\\&|ADT|HOSPITAL|EMR|HOSPITAL|20250107173000||ADT^A40|MSG00035|P|2.5
EVN|A40|20250107173000|||ADMIN123^Ferreira^Carlos
PID|1||789012345^^^HOSPITAL^MR||Mendes^Daniela^Isabel||19950720|F|||258 Lake Street^^Viseu^^3500-001^PT||+351232567890||PT|S|CAT
MRG|890123456^^^HOSPITAL^MR||901234567^^^HOSPITAL^AN
PV1|1|O|REGISTRATION^101^||||||DOC789^Santos^Manuel^^^Dr.`
    }
].sort((a, b) => {
    // Sort alphabetically by message type
    return a.type.localeCompare(b.type);
});
