module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/app/api/download-all-programs/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
async function GET() {
    try {
        // Since jsPDF is a client-side library, we'll redirect to a client-side page that handles the PDF generation
        // Alternatively, we could use a server-side PDF library like pdfkit
        // For now, let's return the program data that the client can use to generate the PDF
        const programs = [
            {
                id: 'rise-circles',
                title: 'Rise Circles',
                description: 'Leadership development through peer learning circles where young leaders collaborate, share experiences, and develop essential skills.',
                duration: '2-3 months',
                frequency: 'Monthly workshops',
                locations: 'Cameroon, Ghana, Nigeria',
                features: [
                    'Structured peer learning sessions with 8-12 participants',
                    'Monthly workshops on leadership, communication, and problem-solving',
                    'Mentorship from experienced leaders and professionals',
                    'Networking opportunities with fellow emerging leaders',
                    'Certificate of completion',
                    'Access to Rise for Impact alumni network'
                ]
            },
            {
                id: 'impact-clinics',
                title: 'Impact Clinics',
                description: 'Intensive project incubation program providing hands-on support to turn social impact ideas into reality.',
                duration: '3 months',
                frequency: 'Weekly sessions',
                locations: 'Cameroon, Ghana',
                features: [
                    'Weekly intensive project development sessions',
                    'One-on-one mentorship from industry experts',
                    'Access to design thinking and project management tools',
                    'Pitch preparation and presentation skills training',
                    'Connections to funding opportunities and potential partners',
                    'Demo day to showcase projects to investors and stakeholders'
                ]
            },
            {
                id: 'rise-for-climate',
                title: 'Rise for Climate',
                description: 'Empowering youth to drive climate action and environmental sustainability in their communities.',
                duration: '4 months',
                frequency: 'Bi-weekly sessions',
                locations: 'Pan-African',
                features: [
                    'Climate science and environmental sustainability training',
                    'Community-based climate action project development',
                    'Access to climate experts and environmental advocates',
                    'Tools and resources for climate advocacy and awareness',
                    'Regional climate action network connections',
                    'Participation in climate conferences and forums'
                ]
            },
            {
                id: 'fellowship',
                title: 'Rise Fellowship',
                description: 'Comprehensive leadership development program for exceptional young change-makers across Africa.',
                duration: '3-6 months',
                frequency: 'Full-time engagement',
                locations: 'Pan-African',
                features: [
                    'Full scholarship covering program costs',
                    'Intensive leadership and professional development curriculum',
                    'Mentorship from African and global leaders',
                    'Real-world project implementation experience',
                    'International exposure and networking opportunities',
                    'Career development and placement support',
                    'Lifelong membership in Rise Fellows community'
                ]
            },
            {
                id: 'campus-ambassadors',
                title: 'Campus Ambassadors Program',
                description: 'Empowering student leaders to establish and run Rise for Impact clubs on their university campuses.',
                duration: '1 academic year',
                frequency: 'Monthly check-ins',
                locations: 'Universities across Africa',
                features: [
                    'Ambassador training & certification program',
                    'Club establishment toolkit with templates and guides',
                    'Monthly stipend for club activities',
                    'Access to Rise for Impact programs and resources',
                    'National ambassadors network and peer learning',
                    'Leadership development workshops and training',
                    'Recognition and certificates for outstanding performance'
                ]
            },
            {
                id: 'opportunity-plug',
                title: 'Opportunity Plug',
                description: 'Curated platform connecting young Africans to opportunities, scholarships, and programs.',
                duration: 'Ongoing',
                frequency: 'Weekly updates',
                locations: 'Pan-African',
                features: [
                    'Weekly curated opportunities newsletter',
                    'Scholarships, fellowships, and grants database',
                    'Job and internship opportunities',
                    'Conferences, competitions, and events calendar',
                    'Application tips and deadline reminders',
                    'Success stories and testimonials',
                    'Community forum for opportunity sharing'
                ]
            }
        ];
        // Return JSON data - the client will handle PDF generation
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            programs,
            message: 'Program data ready for PDF generation'
        });
    } catch (error) {
        console.error('Error in download-all-programs:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to prepare program data'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__9f0a704c._.js.map