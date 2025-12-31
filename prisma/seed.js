const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Starting database seed...')

    // Create default admin user
    const hashedPassword = await bcrypt.hash('admin123', 10)

    await prisma.admin.upsert({
        where: { email: 'admin@riseforimpact.org' },
        update: {},
        create: {
            email: 'admin@riseforimpact.org',
            password: hashedPassword,
            name: 'Admin User',
            role: 'admin',
        },
    })

    console.log('✅ Admin user created')

    // Clear existing data
    await prisma.program.deleteMany()
    await prisma.teamMember.deleteMany()
    await prisma.blogPost.deleteMany()

    console.log('🗑️  Cleared existing data')

    // Seed Programs
    const programs = [{
            title: 'Rise Circles',
            shortDesc: 'Leadership development through peer learning circles',
            description: 'Leadership development through peer learning circles where young leaders collaborate, share experiences, and develop essential skills.',
            longDesc: 'Rise Circles bring together young leaders in structured peer learning environments. The program begins with a 1-day intensive on-site launch event where participants meet, bond, and set the foundation for their learning journey. Following this, participants engage in 2-3 months of virtual mentorship with monthly workshops. Through this hybrid model, they develop critical leadership competencies, share experiences, and collaborate on solving community challenges. Participants build networks that last beyond the program and receive ongoing support from experienced mentors.',
            focus: 'Leadership',
            duration: '1-day on-site + 2-3 months online',
            image: '/images/backgrounds/ClubMeeting.jpeg',
            status: 'active',
        },
        {
            title: 'Impact Clinics',
            shortDesc: 'Community-driven initiatives addressing local challenges',
            description: 'Intensive project incubation program providing hands-on support to turn social impact ideas into reality.',
            longDesc: 'Impact Clinics provide a structured approach to community development through a hybrid model. The journey begins with a 2-day intensive on-site bootcamp where youth gather for project ideation, design thinking workshops, and hands-on collaboration. Following this immersive experience, participants enter a 3-month virtual incubation phase with weekly online sessions, where they identify local challenges, design innovative solutions, and implement sustainable projects with measurable impact. One-on-one mentorship from industry experts guides each project to success.',
            focus: 'Community Development',
            duration: '2-day bootcamp + 3 months virtual',
            image: '/images/backgrounds/impact1.jpeg',
            status: 'active',
        },
        {
            title: 'Rise for Climate',
            shortDesc: 'Climate action and environmental stewardship programs',
            description: 'Empowering youth to drive climate action and environmental sustainability in their communities.',
            longDesc: 'Our climate program mobilizes young people to take concrete action against climate change. It kicks off with a 1-2 day regional climate summit featuring hands-on activities like tree planting, waste management workshops, and environmental site visits. This is followed by 4 months of online engagement with bi-weekly virtual sessions, continuous mentorship from climate experts, and support for implementing community-based climate projects. Participants gain access to tools for climate advocacy and connect with a pan-African network of environmental champions.',
            focus: 'Climate Action',
            duration: '1-2 day summit + 4 months online',
            image: '/images/backgrounds/Togetherness.jpg',
            status: 'active',
        },
        {
            title: 'Rise for Impact Fellowship',
            shortDesc: 'Annual intensive program for young leaders',
            description: 'Comprehensive leadership development program for exceptional young change-makers across Africa.',
            longDesc: 'The Rise for Impact Fellowship is a transformative program bringing together exceptional young leaders from across Africa. Fellows gather for an intensive 2-5 day on-site fellowship conference, a life-changing experience featuring workshops, networking sessions, panel discussions with African leaders, and immersive team-building activities. Following this powerful in-person experience, Fellows receive 3-6 months of personalized virtual mentorship covering leadership development, storytelling, grant writing, public speaking, and relationship building. Full scholarships cover all program costs, and Fellows gain access to a lifelong network of changemakers.',
            focus: 'Leadership & Skills Development',
            duration: '2-5 days on-site + 3-6 months mentorship',
            image: '/images/backgrounds/fellowship.jpeg',
            status: 'active',
        },
        {
            title: 'Campus Ambassadors Program',
            shortDesc: 'Empowering student leaders on university campuses',
            description: 'Empowering student leaders to establish and run Rise for Impact clubs on their university campuses.',
            longDesc: 'The Campus Ambassadors Program identifies and supports passionate student leaders to establish Rise for Impact chapters at their universities. Ambassadors attend a 1-day orientation and training workshop, then spend an academic year building vibrant campus communities driving social impact. They receive monthly virtual check-ins, ongoing support, a stipend for club activities, and access to all Rise for Impact resources. Ambassadors become the face of youth leadership on their campuses, organizing events, workshops, and community projects.',
            focus: 'Campus Leadership',
            duration: '1-day training + 1 academic year',
            image: '/images/backgrounds/ClubMeeting2.jpeg',
            status: 'active',
        },
        {
            title: 'Opportunity Plug',
            shortDesc: 'Gateway to fellowships and scholarships',
            description: 'Your gateway to fellowships, scholarships, and opportunities across Africa with application guidance.',
            longDesc: 'Opportunity Plug is our dedicated platform for bringing the best fellowships, scholarships, grants, and leadership programs directly to young African changemakers. We curate weekly opportunities, provide detailed application guidance, share success stories, and host virtual application support sessions. This is an ongoing program with no specific duration - once you join, you receive continuous updates about life-changing opportunities matched to your interests and goals.',
            focus: 'Opportunities & Resources',
            duration: 'Ongoing program',
            image: '/images/backgrounds/fellowship.jpeg',
            status: 'active',
        },
    ]

    for (const program of programs) {
        await prisma.program.create({ data: program })
    }

    console.log('✅ Programs seeded')

    // Seed Team Members
    const teamMembers = [{
            name: 'Claude Tomoh',
            role: 'Founder & Executive Director',
            category: 'executive',
            country: 'Cameroon',
            focus: 'Leadership & Strategy',
            image: '/images/team/Claude_Tomoh.png',
            email: 'claude@riseforimpact.org',
            linkedin: '#',
            bio: 'Guides strategy, operations, and vision for Rise for Impact across all countries.'
        },
        {
            name: 'Emmanuel Elikem Kpeli',
            role: 'Content Lead',
            category: 'executive',
            country: 'Ghana',
            focus: 'Content & Storytelling',
            image: '/images/team/Emmanuel.jpg',
            email: 'emmanuel@riseforimpact.org',
            linkedin: '#',
            bio: 'Develops Rise for Impact narratives, editorial strategy, and storytelling standards.'
        },
        {
            name: 'Esther Owusu Boahemaa',
            role: 'Programs Lead',
            category: 'executive',
            country: 'Ghana',
            focus: 'Program Coordination',
            image: '/images/team/Esther.jpg',
            email: 'esther@riseforimpact.org',
            linkedin: '#',
            bio: 'Coordinates flagship programs and ensures quality learning across all country teams.'
        },
        {
            name: 'Uche-Ukah Chimzyterem',
            role: 'Communications Lead',
            category: 'executive',
            country: 'Nigeria',
            focus: 'Communications & PR',
            image: '/images/team/Uche.jpg',
            email: 'uche@riseforimpact.org',
            linkedin: '#',
            bio: 'Directs all internal and external communications, advocacy, and press relations.'
        },
        {
            name: 'Nawal Chefton',
            role: 'Country Coordinator',
            category: 'coordinators',
            country: 'Cameroon',
            focus: 'Public Speaking & Leadership',
            image: '/images/team/Nawal.JPG',
            email: 'nawal@riseforimpact.org',
            linkedin: '#'
        },
        {
            name: 'Jessica A. Morris',
            role: 'Country Coordinator',
            category: 'coordinators',
            country: 'Liberia',
            focus: 'Community Building',
            image: '/images/team/Jessica.jpg',
            email: 'jessica@riseforimpact.org',
            linkedin: '#'
        },
        {
            name: 'Kareen Ajatitton',
            role: 'Country Coordinator',
            category: 'coordinators',
            country: 'Nigeria',
            focus: 'Tech & Innovation',
            image: '/images/team/Kareen.jpg',
            email: 'kareen@riseforimpact.org',
            linkedin: '#'
        },
        {
            name: 'Tito Moses',
            role: 'Country Coordinator',
            category: 'coordinators',
            country: 'Uganda',
            focus: 'Peace & Civic Mobilization',
            image: '/images/team/Moses.jpg',
            email: 'moses@riseforimpact.org',
            linkedin: '#'
        },
        {
            name: 'Jacques Balolage',
            role: 'Country Coordinator',
            category: 'coordinators',
            country: 'DRC',
            focus: 'Disability Inclusion',
            image: '/images/team/Jacques.webp',
            email: 'jacques@riseforimpact.org',
            linkedin: '#'
        },
        {
            name: 'Regine Niyorukundo',
            role: 'Country Coordinator',
            category: 'coordinators',
            country: 'Rwanda',
            focus: 'Education & Civic Labs',
            image: "/images/team/Regine's pic.jpg",
            email: 'regine@riseforimpact.org',
            linkedin: '#'
        },
        {
            name: 'Akurugu Princess',
            role: 'Country Coordinator',
            category: 'coordinators',
            country: 'Ghana',
            focus: 'Youth Engagement',
            image: '/images/team/Princess.jpg',
            email: 'princess@riseforimpact.org',
            linkedin: '#'
        },
        {
            name: 'Johnson Pendaeli',
            role: 'Country Coordinator',
            category: 'coordinators',
            country: 'Tanzania',
            focus: 'Mental Health & Well-being',
            image: '/images/team/Johnson.Maturo_headshot.jpg',
            email: 'johnson@riseforimpact.org',
            linkedin: '#'
        },
        {
            name: 'Chafor Ramson Njoyue',
            role: 'NorthWest Regional Coordinator',
            category: 'regional',
            country: 'Cameroon',
            focus: 'Community Building, Leadership Development',
            image: '/images/team/Ramson.jpeg',
            email: 'ramson@riseforimpact.org',
            linkedin: '#'
        },
        {
            name: 'Neh Valerie',
            role: 'SouthWest Regional Coordinator',
            category: 'regional',
            country: 'Cameroon',
            focus: 'Software Engineer, Community Leader',
            image: '/images/team/Neh-Valerie.jpeg',
            email: 'valerie@riseforimpact.org',
            linkedin: '#'
        }
    ]

    for (const member of teamMembers) {
        await prisma.teamMember.create({ data: member })
    }

    console.log('✅ Team members seeded')

    // Auto-subscribe all team members to newsletter
    const teamEmails = teamMembers
        .filter(member => member.email) // Only members with emails
        .map(member => member.email)

    for (const email of teamEmails) {
        await prisma.newsletterSubscriber.upsert({
            where: { email },
            update: { isActive: true },
            create: {
                email,
                isActive: true
            }
        })
    }

    console.log(`✅ ${teamEmails.length} team members subscribed to newsletter`)

    // Auto-subscribe community members to newsletter
    const communityEmails = [
        'ikedinobicovenant@gmail.com', 'babayakubujnr@gmail.com', 'michpeace1@gmail.com', 'somacciwealthcreator@gmail.com',
        'michaelprincelight00@gmail.com', 'adelinechinyelu@gmail.com', 'emmyjudez@gmail.com', 'timothyheavens9@gmail.com',
        'Somtochukwu163@gmail.com', 'sheiladan64@gmail.com', 'tosanwumievans@gmail.com', 'solokios54@gmail.com',
        'mailsamuelchidiebube@gmail.com', 'mansurmyb@gmail.com', 'ajayidamilolajos@gmail.com', 'ahmedsuleiman199912@yahoo.com',
        'fathiatadeyemo2005@gmail.com', 'ucheuna2016@gmail.com', 'imehsamson178@gmail.com', 'agbakwomagnus@gmail.com',
        'emmanuelchideradirect@gmail.com', 'amakamirian770@gmail.com', 'chiwisegodstime@gmail.com', 'ochiechieveshioayala@gmail.com',
        'ofongrace@gmail.com', 'nnadionyinyechi951@gmail.com', 'l.chikumbi@alustudent.com', 'sidikatbanky@gmail.com',
        'c.kalu@alustudent.com', 'c.uwase2@alustudent.com', 'j.offere@alustudent.com', 'v.thompson@alustudent.com',
        'ruthkayitesi08@gmail.com', 'victoriamuludiki@gmail.com', 'v.josephgeo@alustudent.com', 'a.teta1@alustudent.com',
        'euniceadewusic@gmail.com', 'jenniferike7@gmail.com', 'akanfanibanku111@gmail.com', 'n.ishimwe2@alustudent.com',
        'sifakaveza@gmail.com', 'richypromise676@gmail.com', 's.urusaro@alustudent.com', 'j.rutayisire@alustudent.com',
        'christellauwase2@gmail.com', 'akintayodeborahfunmi@gmail.com', 'c.anele@alustudent.com', 'kayitesililiane73@gmail.com',
        'd.iheanacho@alustudent.com', 'emmanueloden23@gmail.com', 'alexandraojukwu@gmail.com', 'a.ibeh@alustudent.com',
        'jejeoluwafisayomi@gmail.com', 'm.elebesunu@alustudent.com', 'o.jacobs@alustudent.com', 'b.baraza@alustudent.com',
        'barazabenjamin58@gmail.com', 'k.ganda@alustudent.com', 'b.niyomukiz@alustudent.com', 'theodoraomunizua16@gmail.com',
        'patienceshemssa@gmail.com', 'o.adebanjo@alustudent.com', 'obiorah575@gmail.com', 'sosowesto@yahoo.com',
        'ameheunice72@gmail.com', 'rolineumunyana12@gmail.com', 'chinenyezitaim@gmail.com', 'd.tlailana@alustudent.com',
        'emmanuelonyinyechi73@gmail.com', 'arinzeokpalab@gmail.com', 'hopevictor45@gmail.com', 'bahemmanuelkimeh@gmail.com',
        'v.moyo@alustudent.com', 'lumnwi4@gmail.com', 'chirahsomto22@gmail.com', 'AmbBlossom@gmail.com',
        'thiongonicole@gmail.com', 'benyzeishimwe23@gmail.com', 'georgelovelym25@gmail.com', 'uwasevaste@gmail.com',
        'richmondassan20@gmail.com', 'l.uwicyeza@alustudent.com', 'olaleyevictor505@gmail.com', 'nyiensejessi@gmail.com',
        'ikemdestiny13@gmail.com', 'rebbeccabassy728@gmail.com', 'eragbais@gmail.com', 'chidimmafavour12003@gmail.com',
        'dianeingabire03@gmail.com', 'sibongilemusukwa@yahoo.com', 'austinenyuma@gmail.com', 'e.asaph@alustudent.com',
        'patrickmoseskachy@gmail.com', 'jeremiahobungabia@gmail.com', 'andyowen360@gmail.com', 'abiodunayobami78@gmail.com',
        'iheanachoamarachi56@gmail.com', 'eluwatochukwu09@gmail.com', 'nixonajuad@gmail.com', 'abramelabu@gmail.com',
        'chissymail4real@yahoo.com', 'hardewumipaul@gmail.com', 'schoollibrariesmatter@gmail.com', 'delontamane@gmail.com',
        'iafricason@gmail.com', 'omnia.hassan.eg@gmail.com', 'jnralex25@gmail.com', 'itamchidimma@gmail.com',
        'stanleeasamani12@gmail.com', 'thenfh2022@gmail.com', 'meekunmedia@gmail.com', 'jessieabonoje@gmail.com',
        'paulineatikpo1@gmail.com', 'muhozadominique89@gmail.com', 'emmynugwaabuh@gmail.com', 'netshiavhelapuseletso@gmail.com',
        'jahblessgodson@gmail.com', 'aliyudanladi212@gmail.com', 'davidekuma26@gmail.com', 'bitrussammai@gmail.com',
        'a.fagbohungbe@yahoo.com', 'habourokyeame6@gmail.com', 'hausatbint20@gmail.com', 'emmajohnson5664@gmail.com',
        'dagheryara4@gmail.com', 'entsieamoahsimon777@gmail.com', 'chiedozieokeke2020@gmail.com', 'hilarychizomam@gmail.com',
        'lumsonita9@gmail.com', 'tijanisodiqdotun@gmail.com', 'clarencebale22@gmail.com', 'tshegofatsoaucley@gmail.com',
        'darlingtonkarnue3@gmail.com', 'udodirimnduneri@gmail.com', 'ajibadebasit40@gmail.com', 'dokurichmond123@gmail.com',
        'jerryugonnaya@gmail.com', 'cfcrawford16@yahoo.com', 'osazuwajoy234@gmail.com', 'victoremmanuel074@gmail.com',
        'teacheranietie@gmail.com', 'moorec228@gmail.com', 'christianakome1@gmail.com', 'gershon.komiga@gmail.com',
        'agbomichaelngele@gmail.com', 'iduozee.o.jeffrey@gmail.com', 'nurudeeneinstein@gmail.com', 'gayflor2019@gmail.com',
        'j.sumbo@alustudent.com', 'ezekwechidinma21@gmail.com', 'blessingchukwuneke28@gmail.com', 'blessing.chukwueke.234982@unn.edu.ng',
        'richardfjkamara@gmail.com', 'promiseoromidayo@gmail.com', 'mohamed9tahmed@gmail.com', 'fatimammaigwaram@gmail.com',
        'chikaanthony1777@gmail.com', 'lauratargbeh@gmail.com', 'ahmedtawfik560@gmail.com', 'themuan2019@gmail.com',
        'benjamindagher@gmail.com', 'dorcasfadele@gmail.com', 'jamesemeka031@gmail.com', 'anthonyojukwu8@gmail.com',
        'boreshi94@gmail.com', 'adelkodjoeson@gmail.com', 'folakemiadesina77@gmail.com', 'nketawajiemmanuel@yahoo.com',
        'julietmanching@gmail.com', 'antionettequasie88@gmail.com', 'edemvictor73@gmail.com', 'abeermajdy123@gmail.com',
        'Adepojuvic247@gmail.com', 'bessongpraise@gmail.com', 'opokumarian06@gmail.com', 'hamzik4real1@gmail.com',
        'kasimubello6454@gmail.com', 'geraldineogo3@gmail.com', 'djeweleffiong@gmail.com', 'nurudeenopeyemi28@yahoo.com',
        'efavour35@yahoo.com', 'cruizyray13@gmail.com', 'kantonyasmine1@gmail.com', 'odescosenah17@gmail.com',
        'omolabakesalako@gmail.com', 'abodedorcas19@gmail.com', 'johnnyspecial1@gmail.com', 'mbetobong.onwioduokit@gmail.com',
        'oladehindealadeo@gmail.com', 'maureenokorie622@gmail.com', 'absonpiano@yahoo.com', 'rusanganwatheo@gmail.com',
        'peterevra6@gmail.com', 'preciousobiabunmo25@gmail.com', 'ibambegidia@gmail.com', 'duokuemmanuella.u@gmail.com',
        'nsikanukpe606@gmail.com', 'abupaulyni@gmail.com', 'gedonifrancis@gmail.com', 'aelizabethnana@gmail.com',
        'mr.muhammadnageeb@gmail.com', 'eyongetarock@yahoo.com', 'ogbuesther54@gmail.com', 'otoyinadebowale@gmail.com',
        'latjorwuonlat1996@gmail.com', 'nprincenwabueze@gmail.com', 'divinityfavour12@gmail.com', 's.wanjohi@alustudent.com',
        'ganyoeyram@gmail.com', 'ifeoluwastella02@gmail.com', 'sarahwealthofficial@gmail.com', 'zadkielcharles42@gmail.com',
        'dirichukwu.30@gmail.com', 'HashemAyoup@yahoo.com', 'uzyjane4@gmail.com', 'spicymodelmanagement@gmail.com',
        'bempevfortune@gmail.com', 'okokohoghenemarho@gmail.com', 'favouritepairs@gmail.com', 'winnerarchibong20@gmail.com',
        'esraarafat67@gmail.com', 'dareboluwatife@yahoo.com', 'sawmadaljrmcamost@gmail.com', 'Blessinge274@gmail.com',
        'tomiwafadare02@gmail.com', 'Dareolaobaju@gmail.com', 'luckygerenwi3@gmail.com', 'alimihalima2@gmail.com',
        'awunievans@yahoo.com', 'msithinintombana0@gmail.com', 'chijiokesuccess071@gmail.com', 'euodiagbatoe8@gmail.com',
        'chideraokeke233@gmail.com', 'tsholofelojele@gmail.com', 'lekotatshegofatso74@gmail.com', 'faithfulwrites2@gmail.com',
        'motema.mamello@gmail.com', 'mpuhwehonore@gmail.com', 'muzhakucha@gmail.com', 'chinazafavour556@gmail.com',
        'ololadeakinwande88@gmail.com', 'estherogunmola2@gmail.com', 'octaviopetery@gmail.com', 'lands4j@gmail.com',
        'ahmedelmawgod@gmail.com', 'leratojessicamaleka@gmail.com', 'niyonkurucyizeren@gmail.com', 'ummarisshack@gmail.com',
        'dkhiddairo@gmail.com', 'passionateangel610@gmail.com', 'kennethofoke5@gmail.com', 'nicholasezekiel045@gmail.com',
        'e.nwaka1512@gmail.com', 'ekissistanleyedem@gmail.com', 'oluwaferanmi1202@gmail.com', 'bolarindebf@gmail.com',
        'ngmiracleezeh7@gmail.com', 'nisfanny@gmail.com', 'saintinopascal@gmail.com', 'ajijolahab@gmail.com',
        'official.edidiongumana@gmail.com', 'wemhvictor1992@gmail.com', 'joelikechukwu133@gmail.com', 'sirahmad2018@gmail.com',
        'estimens20.eg@gmail.com', 'sirryanokello@gmail.com', 'dbabsbabz@gmail.com', 'udochukwukosisochukwu83@gmail.com',
        'olimayombo@gmail.com', 'franciskojosam1@gmail.com', 'mfonisoakpatang@gmail.com', 'priscillaagyemangduah18@gmail.com',
        'waliutaofik@gmail.com', 'Preshamattola@gmail.com', 'wealthhenry9@gmail.com', 'nomcebonzimakwe90@gmail.com',
        'maryoladunjoye10@gmail.com', 'anathizibonti@gmail.com', '18825708@gmail.com', 'udochukwuonyinye@gmail.com',
        'Evanspm2022@gmail.com', 'Startgreayminds110@gmail.com', 'thomasbenjaminb@gmail.com', 'paulbangs2017@gmail.com',
        'emmanuelsarpong4000@gmail.com', 'adesinajeremiah01@gmail.com', 'Belindacarl116@gmail.com', 'dsdmisse@gmail.com',
        'yaw123bosca@gmail.com', 'inemesitisang14@gmail.com', 'gbernomurinda1997@gmail.com', 'hasnaa.ayobe92h@gmail.com',
        'ceo.tenacity@gmail.com', 'aderibigbekwinxter623@gmail.com', 'info.atsukwame@gmail.com', 'abimbolaolusegun559@gmail.com',
        'kingutuk@gmail.com', 'chiomaifeyinwa8@gmail.com', 'claudetomo20@gmail.com', 'raphaelynbomosy@gmail.com',
        'evachioma2@gmail.com', 'okwechimeonyedinma@gmail.com', 'zackmaxwellbrowne20@gmail.com', 'olubowaleprecious12@gmail.com',
        'chidoruth22@gmail.com', 'zeusboiyezee@gmail.com', 'yeagaremmanuel199@gmail.com', 'ezinwanneokwechime95@gmail.com',
        'oppy.rachael@yahoo.com', 'tumztau@gmail.com', 'adeyanjuvictor2000@gmail.com', 'walkerdeward5@gmail.com',
        'waane34@gmail.com', 'tarephilips@gmail.com', 'basintale.goodenough@gmail.com', 'stacybsmith99@gmail.com',
        'yawhaligah@gmail.com', 'k.ngango@alustudent.com', 'shedrickknungehn@gmail.com', 'halleluyaholudele@gmail.com',
        'delphineazah4@gmail.com', 'carineambi125@gmail.com', 'jimohjesutomi2022@gmail.com', 'minamerry7@gmail.com',
        'ogbejaclinton@gmail.com', 'ndabosed@gmail.com', 'favourdama444@gmail.com', 'djaffopraise@gmail.com',
        'jofetesinphor@gmail.com', 'nawalchetfon11@gmail.com', 'awabryannji@gmail.com', 'abigailepongseh@gmail.com',
        'titomoses217@gmail.com', 'owusubenedict105@gmail.com', 'priscayiryihchuyeh@gmail.com', 'noradawoo18@gmail.com',
        'bengyellanoella7@gmail.com', 'endahclaudia61@gmail.com', 'karenmangwung@gmail.com', 'serge.ishimwe@ashesi.edu.gh',
        'enocktandeka8@gmail.com', 'diansikeh@gmail.com', 'companyamfa@gmail.com', 'chemanka3@gmail.com',
        'fuambuhelga@gmail.com', 'owonaraphaelle2006@gmail.com', 'mengnjohpamela@gmail.com', 'flyinnsafuh@gmail.com',
        'elieltoukamnkamta@gmail.com', 'chuyehmaritte@gmail.com', 'faithajocha@gmail.com', 'godwillmbah3@gmail.com',
        'cwill3072@gmail.com', 'kyeimaame23@gmail.com', 'wilsonndifor@gmail.com', 'angellaaisu2018@gmail.com',
        'wirngoelianet@gmail.com', 'ngonganitangeh@gmail.com', 'cindyjanesumohmwene@gmail.com', 'jessicachinedu99@gmail.com',
        'janetansah656@gmail.com', 'queencyngebenui123@gmail.com', 'hilarynoundou@gmail.com', 'kellyachuoransom@gmail.com',
        'stessyndokuo@gmail.com', 'bohdzomobobpeter@gmail.com', 'nduwayoinnocent90@gmail.com', 'ogechukwuojukwu36@gmail.com',
        'bnchofong@gmail.com', 'tchapmoina@gmail.com', 'adongosam5@gmail.com', 'zainabajalloh8@gmail.com',
        'uwinezavestine004@gmail.com', 'bunilashalin93@gmail.com', 'mabouvalaine@gmail.com', 'anasthasiebekoa455@gmail.com',
        'jenniangh20@gmail.com', 'ppptwinwintot@gmail.com', 'lumnchifor265@gmail.com', 'wanjikukariuki35@gmail.com',
        'ivyawontra@gmail.com', 'faith.martins328@gmail.com', 'blastknight121@gmail.com', 'mohamedarte06@gmail.com',
        'aliibrahimhassan01@gmail.com', 'madutmam@gmail.com', 'seghansuraiya@gmail.com', 'gatkhorkueth05@gmail.com',
        'babrahalimo5@gmail.com', 'kathlynlindsytendoh@gmail.com', 'tracynsang@gmail.com', 'reverian109@gmail.com',
        'mushiehedison66@gmail.com', 'mafeutchangkengneabestinemerli@gmail.com', 'Wycliffeochieng901@yahoo.com', 'francistumuramye39@gmail.com',
        'bamenjohcamilla@gmail.com', 'cainkrop@gmail.com', 'anamityp@gmail.com', 'kisekedy2014@gmail.com',
        'birushavictoria9@gmail.com', 'anyanwuultimate9@gmail.com', 'kareenajatiton02@gmail.com', 'catherinesiringumade@gmail.com',
        'brayanjordanace@gmail.com', 'esohfaithngemenyi@gmail.com', 'joyp80060@gmail.com', 'nanatayokatheblanche@gmail.com',
        'dlaminisinakweyinkosi@gmail.com', 'marieclariechijioke@gmail.com', 'zoundastecy27@gmail.com', 'meferehlarisia@gmail.com',
        'nforrawlings491@gmail.com', 'annaflonick@gmail.com', 'yengongrenelia@gmail.com', 'favour.asterfav1@gmail.com',
        'honkepsem@gmail.com', 'alphonseamungwa@gmail.com', 'baloloagejack@gmail.com', 'ketchenobimatakang@gmail.com',
        'emmanuel.kpeli@ashesi.edu.gh', 'williamnjume@gmail.com', 'anohprecious01@gmail.com', 'mokomsonita0@gmail.com',
        'yongajoseph872@gmail.com', 'wanjiikumuruha@gmail.com', 'mbahbenoit@gmail.com', 'emmaafumbomnadine@gmail.com',
        'nsahag98@gmail.com', 'bahawazirapha@gmail.com', 'mangatiena@gmail.com', 'tchiazemerelis@gmail.com',
        'wendyndah2@gmail.com', 'mokelejemanuela@gmail.com', 'pascoviengum@gmail.com', 'ndipnadinebesong@gmail.com',
        'bamenjohnyuybimeni@gmail.com', 'christopherfondzenyuy@gmail.com', 'bongyisandra@gmail.com', 'deborasuday20@gmail.com',
        'pendaelyjohnson13@gmail.com', 'angwiciara@gmail.com', 'tinadineakoko@gmail.com', 'tfortuneaimee@gmail.com',
        'paulmuchi2@gmail.com', 'uwiringiyimanacos20@gmail.com', 'jessicaangelmorris722@gmail.com', 'yashim615@gmail.com',
        'mikahrandy5@gmail.com', 'fatimaidriss601@gmail.com', 'jargina.chohan7@gmail.com', 'rimshasiddique884@gmail.com',
        'ntenkialeticia@gmail.com', 'preciouslivy92@gmail.com', 'ndeihjosephkwenyui@gmail.com', 'layibematthewcedric@gmail.com',
        'philflux2@gmail.com', 'Sagarkw570@gmail.com', 'Shinaidankiangmatiah@gmail.com', 'ahmedmahboobhassan@gmail.com',
        'hafizaaliza421@gmail.com', 'fongwatabifor@gmail.com', 'maurelledjiofack@gmail.com', 'Kumarikhimya@gmail.com',
        'nopumairamou@gmail.com', 'yakondaloveline8@gmail.com', 'woyubryna@gmail.com', 'elonaboat@gmail.com',
        'natanahelatankeu@gmail.com', 'akweshpraise@gmail.com', 'ifechukwudlight50@gmail.com', 'akshralohana99@gmail.com',
        'lindaabanz489@gmail.com', 'haqqijawairiyah@gmail.com', 'piryaduseja@gmail.com', 'ayeshasaud0017@gmail.com',
        'marwameer2@gmail.com', 'zaibmbilal@gmail.com', 'njenjingangnya@gmail.com', 'amnahkasim58@gmail.com',
        'hamnabkhan@gmail.com', 'moeibrahim91@gmail.com', 'warisha.tul.islam@gmail.com', 'tayykhan123@gmail.com',
        'naheedliaquat89@gmail.com', 'ewurakua.adoma@gmail.com', 'mbindeprecious21@gmail.com', 'azkiaaftab21@gmail.com',
        'ashudahlin1@gmail.com', 'anyammark87@gmail.com', 'arwasaud.ch@gmail.com', 'fendah880@gmail.com',
        'samuelochor1@gmail.com', 'tehreemf306@gmail.com', 'alishbakhurram28@gmail.com', 'moforkelly54@gmail.com',
        'amarahaltaf14@gmail.com', 'deborahtimothy453@gmail.com', 'mariyambano0106@gmail.com', 'asibechehsavoir24@gmail.com',
        'shahidjavaria799@gmail.com', 'anjiachagani99@gmail.com', 'evangeliabanye@gmail.com', 'aemilabravo@gmail.com',
        'afzalmanahil97@gmail.com', 'maurineankiambomninying@gmail.com', 'mary-ann.adzim@ashesi.edu.gh', 'namra.bangash123@gmail.com',
        'djamilagacko@gmail.com', 'shinninglove123@gmail.com', 'rosineakisarlella@gmail.com', 'larteyfrank12@yahoo.com',
        'dannylefissy@gmail.com', 'fatmamaleta7@gmail.com', 'ngwajuthel123@gmail.com', 'anaelletchatchouang85@gmail.com',
        'yendukuam@gmail.com', 'andebame12@gmail.com', 'syrachidsanogo78@gmail.com', 'claudekandelle1@gmail.com',
        'hantarolandelandy@gmail.com', 'assongnytyphaine@gmail.com', 'anchalkhemani123@gmail.com', 'sitrakarafanomezantsoaa@gmail.com',
        'nguformark@gmail.com', 'braintequanyangadolf@gmail.com', 'sergetohkuh@gmail.com', 'samuelmanga179@gmail.com',
        'chiemenaagulanna05@gmail.com', 'abeldieubenitngoumefou@gmail.com', 'njie96.cm@gmail.com', 'komgbendajoseph6@gmail.com',
        'gadisheirra@gmail.com', 'achaesther2004@gmail.com', 'uche.chimzyterem@gmail.com', 'osarenomaojebo@gmail.com',
        'godstimeokoene977@gmail.com', 'summyyahsarwar@gmail.com', 'adeshinakikelomo262@gmail.com', 'malaikangundue@gmail.com',
        'shehzadahmed24dec@gmail.com', 'elishaebsiy59@gmail.com', 'fazalchaudhary1212@gmail.com', 'tsugeldaya01@gmail.com',
        'leinyuyrosette6@gmail.com', 'nyiezigodwillnkepovewa@yahoo.com', 'mohamedmoustahabou@gmail.com', 'telmantein@gmail.com',
        'infinityastronaut21@gmail.com', 'bobby1.rdd@gmail.com', 'paulalamu2020@gmail.com', 'tchatchoualaetitia27@gmail.com',
        'sundayqueeniver@gmail.com', 'ndohalvinm@gmail.com', 'maryamsarwar0910@gmail.com', 'dizcipleanane@gmail.com',
        'mayaoutakem@gmail.com', 'tanitakohdaniella@gmail.com', 'akintadeadeola75@gmail.com', 'laibaiftikhar0322@gmail.com',
        'goodnessakwesehm@gmail.com', 'berinyuycheriebelle@gmail.com', 'mulahclintonn@gmail.com', 'abenakoiba@gmail.com',
        'kifayatuhamza3@gmail.com', 'essama.paul891@gmail.com', 'onyejekwejudith@gmail.com', 'bayonfranckkadder@gmail.com',
        'tsifaith50@gmail.com', 'yekofrar@gmail.com', 'peternancy298@gmail.com', 'obamsamuelulrich@gmail.com',
        'yohanbradley24@gmail.com', 'kedeldonfack2222@gmail.com', 'munirmalaika00@gmail.com', 'mbahlarissa@yahoo.com',
        'fonlondzelanyuynoury@gmail.com', 'fonyuybrianwills@gmail.com', 'alajembaemmanuel06@gmail.com', 'ahmadnawab431@gmail.com',
        'ngeukeuyossanoemiesamira@gmail.com', 'tchindaflaura@gmail.com', 'cmboh1815@gmail.com', 'rpirmuh@gmail.com',
        'lmugadza1982@gmail.com', 'nihakumar719@gmail.com', 'swiftnathan702@gmail.com', 'mbongvanisteroy@gmail.com',
        'tsemeunathan@gmail.com', 'briskwalksjoshua@gmail.com', 'lovicha2014@gmail.com', 'charnengams@gmail.com',
        'bongruyvette@gmail.com', 'shalomprince794@gmail.com', 'hilaryosifo@gmail.com', 'irenemallya143@gmail.com',
        'Abiagermain121@gmail.com', 'kabwechitupa@gmail.com', 'umarjemmy45@gmail.com', 'uncle0ic@gmail.com',
        'adaezeukpai915@gmail.com', 'ngeprecious020@gmail.com', 'njongnyamakayla78@gmail.com', 'muradkamran101@gmail.com',
        'jelikatumambu@gmail.com', 'allanbemsimbom@gmail.com', 'nyanchianderson@gmail.com', 'kathia.andine@gmail.com',
        'truthafanwi@gmail.com', 'karendiane05@gmail.com', 'zekeyojulius@gmail.com', 'floraakisarl29@gmail.com',
        'kouamboraphaelle@gmail.com', 'precioustina299@gmail.com', 'joyashly034@gmail.com', 'jawwadbwasi@gmail.com',
        'sederickapah4@gmail.com', 'lums9395@gmail.com', 'nguzieziklag@gmail.com', 'atesangdaniela12@gmail.com',
        'desireeabichak@icloud.com', 'joniaureliemanyenkeng@gmail.com', 'atesangryan15@gmail.com', 'carolineemma199@gmail.com',
        'moforkeren28@gmail.com', 'triumphszenenyui@gmail.com', 'ngalawhitney031@gmail.com', 'venancek89@gmail.com',
        'brighterachajeng@gmail.com', 'afuhnwikarlieche@gmail.com', 'nzifacmiriam@gmail.com', 'aureliaessama12@gmail.com',
        'gasienferdinand01@gmail.com', 'ashleychiamow537@gmail.com', 'daniellefeukeng@gmail.com', 'abhiphoebe87@gmail.com',
        'emmanuelyvanndjomou@gmail.com', 'goodnessmbumenyuy@gmail.com', 'tabotclarise@gmail.com', 'penuelshalom35@gmail.com',
        'zonamangimangi@gmail.con', 'chiainnajuly@gmail.com', 'chatwithgrace8@gmail.com', 'sorellefoufouo@gmail.com',
        'nomenetiwa5@gmail.com', 'yuroser123@gmail.com', 'oluwabusayoadenike4@gmail.com', 'etowfaith@gmail.com',
        'hermyonnewamba@gmail.com', 'nzeulangmichel@gmail.com', 'chitra25000@gmail.com', 'roxanalamama237@gmail.com',
        'mahnoorakbarali783@gmail.com', 'bihcassandra69@gmail.com', 'djinousitchaarol@gmail.com', 'tangomoange@gmail.com',
        'enanora9@gmail.com', 'mbuhjudeamah@gmail.com'
    ]

    for (const email of communityEmails) {
        await prisma.newsletterSubscriber.upsert({
            where: { email },
            update: { isActive: true },
            create: {
                email,
                isActive: true
            }
        })
    }

    console.log(`✅ ${communityEmails.length} community members subscribed to newsletter`)

    // Seed Blog Posts
    const blogs = [{
            title: 'Never Let Your Background Put Your Back on the Ground: The Motivation Behind Rise for Impact',
            excerpt: 'Discover the personal journey from an underprivileged community to founding a pan-African youth movement. This is the story of why Rise for Impact exists and how we\'re building a generation of African changemakers who refuse to let circumstances define their future.',
            category: 'Our Story',
            author: 'Claude Tomoh',
            date: 'December 31, 2025',
            url: '/blog/1',
            image: '/images/backgrounds/fellowship.jpeg',
            content: `
# Never Let Your Background Put Your Back on the Ground

## The Motivation Behind Rise for Impact

![Rise for Impact Team Meeting](/images/backgrounds/ClubMeeting.jpeg)

Rise for Impact was born from lived experience—not theory, not trends, and not convenience. It was born from growing up in an underprivileged community where potential was abundant, but opportunity was scarce.

In many of our communities, struggle is normalized. Young people grow up watching others work hard and still remain stuck. Over time, this reality quietly reshapes ambition. Dreams begin to feel unrealistic. Hope starts to feel optional.

Yet, one quote has always guided my thinking:

**"Never let your background put your back on the ground."**

That belief became the foundation of Rise for Impact.

---

## Growing Up Surrounded by Untapped Potential

![Youth Engagement Session](/images/backgrounds/youthLead.jpeg)

From an early age, I observed a painful pattern. Brilliant young people were disengaged—not because they lacked intelligence, but because they lacked exposure, guidance, and belief. Some were demotivated by circumstances beyond their control. Others had skills but no direction. Many were actively searching for opportunities yet were unprepared to access them.

It was common to hear complaints about the lack of jobs, internships, scholarships, or fellowships. But when asked simple questions—"Can you share your LinkedIn profile?" or "How are you positioning yourself?"—the answers often revealed a deeper issue. Profiles were empty. Skills were undocumented. Networks were nonexistent.

**This was not laziness.**  
**This was systemic disadvantage mixed with information gaps.**

Opportunities existed—but many young people did not know how to find them, access them, or prepare for them. Ignorance, not incapacity, was the real barrier.

---

## The Question That Changed Everything

At some point, I stopped asking, "Why is this happening?"  
I started asking, **"What can I do about it?"**

Waiting for governments, institutions, or external organizations to fix the problem felt insufficient. The challenges were urgent, and the youth could not afford more delays.

I realized that **impact does not always begin with power—it begins with initiative.**

---

## The Ashesi University Influence

My time at Ashesi University was transformational. It placed me in an environment where integrity, leadership, and ethical responsibility were not optional—they were expected.

More importantly, I was surrounded by young people who shared a deep commitment to impact. Students who questioned systems, challenged norms, and actively sought ways to improve their communities. People who looked at Africa's challenges and saw responsibility rather than helplessness.

That community expanded my worldview and strengthened my resolve. It showed me what becomes possible when young people are given exposure, structure, and the confidence to lead.

But it also raised an uncomfortable truth: **not every young person will have access to spaces like Ashesi.**

---

## Exposure as a Privilege—and a Responsibility

Leaving my home country to study in a different environment made one thing very clear: **exposure is a privilege.** Many talented young Africans will never leave their countries, attend globally recognized institutions, or access international networks.

And yet, their potential remains just as powerful.

This realization shaped a deeper sense of purpose. Knowledge, exposure, and opportunity should not remain concentrated among a few. They should be shared, multiplied, and localized.

That conviction led to the creation of Rise for Impact.

---

## Why Rise for Impact Exists

![Community Impact Initiatives](/images/backgrounds/impact.jpeg)

Rise for Impact exists to **activate young people, not to wait for them to be "ready."**

It was created as a platform where youths are:
- **Motivated** to believe in their potential
- **Mobilized** to take action within their communities
- **Equipped** with relevant skills and mindsets
- **Connected** to like-minded changemakers across Africa

We believe young people should not wait to be chosen before they start making impact. Leadership does not begin with a title—it begins with action.

**Rise for Impact is not about creating dependency. It is about building agency.**

---

## A Pan-African Vision for Change

![Together We Rise](/images/backgrounds/Togetherness.jpg)

Africa's greatest asset is its youth. But without guidance, preparation, and opportunity, that asset remains underutilized.

Rise for Impact was intentionally designed as a **pan-African platform** because the challenges faced by young people do not stop at national borders. Limited exposure, lack of mentorship, and disengagement are shared experiences across the continent.

Our vision is to support a new generation of African changemakers who:
- **Lead community-driven solutions**
- **Build relevant skills** for the future of work
- **Create impact where they are, with what they have**
- **Collaborate across borders** for shared progress

By 2035, we envision:
- **10,000+ young African leaders** trained and equipped
- **Active programs in 20+ African countries**
- **A self-sustaining network** of alumni creating ripple effects
- **Global recognition** of African youth leadership excellence
- **Measurable community impact** across health, education, climate, and economic development

---

## What We Stand For

![Leadership Development Session](/images/backgrounds/ClaudeMeeting1.jpeg)

At its core, RISE for Impact is guided by four principles:

### 1. Agency
Young people are not powerless. They have the capacity to lead change right now, right where they are. We don't wait for perfect circumstances—we create opportunities within existing realities.

### 2. Preparation
Opportunity favors the ready. We equip young people with skills, mindsets, and tools they need to access and maximize opportunities. From grant writing to storytelling, from project management to relationship building—we provide comprehensive preparation.

### 3. Community
Change is stronger when built together. We create networks of support where young leaders learn from each other, collaborate on projects, and lift each other up. Our strength is in our collective commitment to impact.

### 4. Action
Impact begins now, not someday. We don't just talk about change—we implement it. Every program participant develops and launches real community projects. We measure success by tangible impact, not just certificates earned.

---

## Our Programs: Multiple Pathways to Impact

![Impact Clinics in Action](/images/backgrounds/impact_clinic.jpeg)

Rise for Impact offers six programs designed to meet young people where they are:

### 1. Rise for Impact Fellowship
Our flagship program bringing together exceptional young leaders for intensive training, personalized mentorship, and lifelong community. **2-5 days on-site + 3-6 months virtual mentorship.**

### 2. Rise Circles
Monthly peer learning and accountability groups focused on leadership development and project implementation. **1-day on-site kickoff + 2-3 months online engagement.**

### 3. Impact Clinics
Intensive project incubation program helping youth turn ideas into funded, implementable community solutions. **2-day bootcamp + 3 months virtual support.**

### 4. Rise for Climate
Youth-led climate action program combining education, advocacy, and hands-on environmental projects. **1-2 day summit + 4 months online engagement.**

### 5. Campus Ambassadors
University student leaders who bring RISE programs to their campuses and organize local impact activities. **1-day training + year-long engagement.**

### 6. Opportunity Plug
Weekly opportunities newsletter and virtual sessions connecting youth to scholarships, internships, fellowships, and jobs across Africa.

---

## Why Support Rise for Impact?

![Community Engagement](/images/backgrounds/ClubMeeting2.jpeg)

### The Problem is Clear
- **387 million African youth** will enter the job market by 2030
- **60% of Africa's unemployed** are young people
- Limited access to mentorship, skills training, and opportunity networks
- Talent exists, but pathways to leadership are scarce

### Our Approach is Proven
- **Hybrid model** (on-site + virtual) maximizes impact while minimizing costs
- **Pan-African reach** with coordinators in 8+ countries
- **Skills-first curriculum** addressing real-world leadership needs
- **Community-driven projects** creating measurable local impact
- **Youth-led design** ensuring relevance and sustainability

### The Impact is Measurable
Since our founding:
- Engaged **500+ young leaders** across multiple programs
- Launched **50+ community impact projects**
- Distributed **1,000+ opportunity alerts** helping youth access resources
- Built a network across **8 African countries**
- Maintained **85% program completion rate**

---

## How You Can Support Our Work

We cannot do this alone. Creating lasting change requires a community of supporters who believe in African youth leadership.

**Contact Us:**
- **Email:** info@riseforimpact.org
- **WhatsApp:** +237 673 559 635 | +233 50 135 9519

### For Organizations & Sponsors

#### Program Sponsorship ($5,000 - $50,000)
- Sponsor a full Fellowship cohort (50-100 Fellows)
- Fund Impact Clinics in specific countries
- Support Climate Action initiatives
- Enable Campus Ambassador expansion

**Benefits:**
- Logo placement on all program materials
- Recognition in program reports and social media
- Direct engagement with Fellows through mentorship opportunities
- Impact reporting showing measurable outcomes

#### Mentorship Partnerships
Connect your organization's leaders with our Fellows for 3-6 month mentorship engagements. This creates mutual value: your team develops coaching skills while shaping the next generation of African leaders.

#### In-Kind Support
- Training facilities for on-site programs
- Technology and equipment for virtual engagement
- Professional services (design, legal, accounting)
- Marketing and communications support

### For Individual Donors

#### Monthly Partnership ($10 - $500/month)
Sustain our operations and enable consistent program delivery:
- $10/month: Support 1 Campus Ambassador
- $50/month: Sponsor 1 Fellowship application review
- $100/month: Fund opportunity research and distribution
- $250/month: Support 1 Impact Clinic participant
- $500/month: Sponsor 1 Fellow's full journey

#### One-Time Contribution ($50 - $10,000)
Make an immediate impact:
- $50: Support materials for 1 program participant
- $250: Fund 1 Fellow's travel to on-site conference
- $500: Sponsor 1 Impact Clinic project
- $1,000: Support 1 Fellow's full program costs
- $5,000: Fund an entire program cohort

### For Volunteers & Mentors

#### Become a Mentor
Share your expertise with emerging leaders:
- **Time commitment:** 2-4 hours per month for 3-6 months
- **Focus areas:** Leadership, grant writing, storytelling, project management, career development
- **Format:** Virtual meetings + email support
- **Impact:** Shape a young leader's trajectory

#### Volunteer Your Skills
- Content creation (writing, design, video)
- Program facilitation and training delivery
- Technology development and support
- Research and impact evaluation
- Event coordination

### For Partners & Institutions

#### University Partnerships
- Host Campus Ambassador programs
- Provide venue for on-site events
- Connect students to opportunities
- Collaborate on research and evaluation

#### Corporate Partnerships
- Employee volunteering and mentorship programs
- Internship and job opportunities for Fellows
- Sponsorship of specific program tracks
- Joint events and thought leadership

#### Foundation & Funder Partnerships
- Multi-year program funding
- Capacity building support
- Network introductions
- Co-creation of new initiatives

---

## Join Us in Building Africa's Future

Rise for Impact is more than an organization—it's a movement. A movement of young people who refuse to let their background define their future. A movement of supporters who believe that investing in youth is investing in Africa's transformation.

**When young people rise, communities rise.**  
**When communities rise, Africa rises.**

We invite you to be part of this journey. Whether you contribute financially, share your expertise as a mentor, offer in-kind support, or simply spread the word about our work—you become part of building a generation of African changemakers.

---

## Take Action Today

### Apply or Nominate
Know an exceptional young African leader? Nominate them for our Fellowship or encourage them to apply: [Get Involved](/get-involved)

### Become a Partner
Ready to support Rise for Impact? Let's discuss how your organization can create lasting impact: **info@riseforimpact.org**

### Make a Donation
Every contribution directly supports a young African leader's journey: **info@riseforimpact.org**

### Stay Connected
Follow our journey and see the impact you're creating:
- **Website:** riseforimpact.org
- **Email:** info@riseforimpact.org
- **WhatsApp:** +237 673 559 635 | +233 50 135 9519
- **Social Media:** @riseforimpact (all platforms)

---

## A Personal Invitation

This is not just my story—it's the story of millions of young Africans who have potential but lack pathways. It's the story of communities waiting for their youth to return as leaders. It's the story of an Africa that is rising, one young person at a time.

I invite you to be part of writing the next chapter. Together, we can ensure that no young African's background puts their back on the ground. Together, we can build the Africa we all dream of.

**Let's rise together.**

---

*Claude Tomoh is the Founder and Executive Director of Rise for Impact, and a student at Ashesi University in Ghana. His work focuses on youth leadership development, community impact, and creating pathways for African changemakers.*

**Ready to Support?** Contact us:
- **Email:** info@riseforimpact.org
- **WhatsApp:** +237 673 559 635 | +233 50 135 9519
- **Visit:** [Get Involved](/get-involved) to explore partnership opportunities
            `,
            mediaGallery: JSON.stringify([
                '/images/backgrounds/fellowship.jpeg',
                '/images/backgrounds/ClubMeeting.jpeg',
                '/images/backgrounds/ClubMeeting2.jpeg',
                '/images/backgrounds/Togetherness.jpg',
                '/images/backgrounds/impact.jpeg',
                '/images/backgrounds/impact_clinic.jpeg',
                '/images/backgrounds/youthLead.jpeg',
                '/images/backgrounds/ClaudeMeeting1.jpeg'
            ])
        },
        {
            title: 'Climate Action: Our Tree Planting Initiative',
            excerpt: 'Join us in our mission to plant 10,000 trees across Africa as part of Rise for Climate.',
            category: 'Climate Action',
            author: 'Emmanuel Elikem Kpeli',
            date: 'December 20, 2025',
            url: '/blog/2',
            image: '/images/backgrounds/Togetherness.jpg',
        },
        {
            title: 'Impact Clinics: Stories from the Field',
            excerpt: 'Hear from youth leaders who are transforming their communities through our Impact Clinics program.',
            category: 'Impact Stories',
            author: 'Esther Owusu Boahemaa',
            date: 'December 15, 2025',
            url: '/blog/3',
            image: '/images/backgrounds/impact1.jpeg',
        }
    ]

    for (const blog of blogs) {
        await prisma.blogPost.create({ data: blog })
    }

    console.log('✅ Blog posts seeded')
    console.log('🎉 Database seeding complete!')
}

main()
    .catch((e) => {
        console.error('❌ Seeding failed:', e)
        process.exit(1)
    })
    .finally(async() => {
        await prisma.$disconnect()
    })