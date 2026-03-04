export const tagLine = `Systems Architect & Full Stack Developer specializing in AI integration, mobile applications, and scalable cloud architectures. I build robust, high-performance systems using Node.js, React Native, and LLM frameworks.`

export const skills = [
    {
        category: "Backend", items: [
            { name: "Node.js", icon: "Server" },
            { name: "Express.js", icon: "Zap" },
            { name: "Django", icon: "Globe" },
            { name: "Django REST Framework", icon: "Code2" },
            { name: "Flask", icon: "Terminal" },
            { name: "Frappe", icon: "Settings" }
        ]
    },
    {
        category: "Databases & Security", items: [
            { name: "MongoDB", icon: "Database" },
            { name: "PostgreSQL", icon: "Database" },
            { name: "MariaDB", icon: "Database" },
            { name: "JWT Authentication", icon: "Lock" },
            { name: "RBAC", icon: "ShieldCheck" }
        ]
    },
    {
        category: "DevOps & Cloud", items: [
            { name: "AWS S3", icon: "Cloud" },
            { name: "Docker", icon: "Box" },
            { name: "Linux", icon: "Terminal" },
            { name: "Git & GitHub", icon: "Github" },
            { name: "CI/CD (GitLab)", icon: "GitBranch" },
            { name: "Vercel / Render", icon: "ExternalLink" }
        ]
    },
    {
        category: "Frontend", items: [
            { name: "React.js", icon: "Cpu" },
            { name: "Next.js", icon: "Layout" },
            { name: "Tailwind CSS", icon: "Palette" },
            { name: "Redux", icon: "Layers" },
            { name: "React Native", icon: "Smartphone" }
        ]
    }
];

export const projects = [
    {
        id: 1,
        name: 'Finsense - Financial Management Backend',
        created_year: '2024',
        tech: 'Node.js, Express.js, MongoDB, JWT, RBAC',
        description: 'Scalable financial management backend deployed in an educational institution. Engineered transaction state management and audit logging for transactions exceeding ₹3 Crore INR.',
        source_code: 'https://github.com/SankalpPimpalkar/Role_Base_Auth-main',
        demo: 'https://financemangament.vercel.app/'
    },
    {
        id: 2,
        name: 'S3 Storage - Cloud File Management',
        created_year: '2025',
        tech: 'React.js, AWS S3, Multipart Upload, Cloud Security',
        description: 'Web-based cloud file management system supporting secure authentication and multipart uploads of files up to 10GB with real-time tracking.',
        source_code: 'https://github.com/SankalpPimpalkar/S3-Bucket-Storage-Manager',
        demo: 'https://s3-bucket-storage-manager.vercel.app/'
    }
]

export const works = [
    {
        id: 1,
        companyName: "UnifyXperts",
        role: "Backend Developer (Internship)",
        location: "Goregoan, Maharashtra | Aug 2025 – Oct 2025",
        companyDescription: "Technology consulting company specializing in digital transformation and ERP solutions.",
        respAndAchievements: [
            "Built REST APIs using the Frappe framework to automate token refresh and backend configuration workflows.",
            "Implemented data validation and de-duplication logic before persisting records into MariaDB, improving query performance.",
            "Collaborated with cross-functional teams to design efficient data flows and database schemas."
        ],
        skillUtilized: [
            "Frappe Framework", "Python", "MariaDB", "REST APIs", "Data Validation"
        ]
    },
    {
        id: 2,
        companyName: "SuperCeuticals Private Limited",
        role: "Full Stack Developer (Internship)",
        location: "Gurugram, Haryana | May 2024 - Apr 2025",
        companyDescription: "Innovative healthcare startup aiming to make medical services faster and more economical.",
        respAndAchievements: [
            "Developed and maintained backend services using Node.js and Express.js to support multiple workflows and third-party integrations.",
            "Designed authentication and authorization flows using JWT and role-based access control.",
            "Built and optimized database models to ensure secure data handling and efficient query performance."
        ],
        skillUtilized: [
            "Node.js", "Express.js", "MongoDB", "JWT", "RBAC", "React"
        ]
    },
]