import dynamic from 'next/dynamic'

const PowerBIEmbed = dynamic(() => import('powerbi-client-react').then(m => m.PowerBIEmbed), { ssr: false });

const constembedConfig = {
    type: 'report', // Supported types: report, dashboard, tile, visual, and qna.
    id: '00f8017f-a945-4b8a-97e2-bd429c9ec030',
    embedUrl: "https://app.powerbi.com/reportEmbed?reportId=00f8017f-a945-4b8a-97e2-bd429c9ec030&groupId=7ff42372-3502-4a5c-b988-c6708598eadb&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVBBQVMtMS1TQ1VTLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJtb2Rlcm5FbWJlZCI6dHJ1ZSwidXNhZ2VNZXRyaWNzVk5leHQiOnRydWUsInNraXBRdWVyeURhdGFTYWFTRW1iZWQiOnRydWUsInNraXBRdWVyeURhdGFQYWFTRW1iZWQiOnRydWUsInNraXBRdWVyeURhdGFFeHBvcnRUbyI6dHJ1ZX19",
    accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSIsImtpZCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNTA5MmMxMDItOGMxMi00MzkzLTk2ZTMtMjI4MTBhNzU4MWU1LyIsImlhdCI6MTY2NTA4MjEzNywibmJmIjoxNjY1MDgyMTM3LCJleHAiOjE2NjUwODY0NDQsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84VEFBQUFQeVpMajZEZlBKNnFHdHRDaU5nVndnMGdtS01IVmxTTnpBVVVQQlo5NExDdFVjMW9vRVVCUnVKYnZGRElGQTNFIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6Ijg3MWMwMTBmLTVlNjEtNGZiMS04M2FjLTk4NjEwYTdlOTExMCIsImFwcGlkYWNyIjoiMiIsImZhbWlseV9uYW1lIjoiQkVMIiwiZ2l2ZW5fbmFtZSI6IkJJIiwiaXBhZGRyIjoiMjAwLjguMTkwLjE3OCIsIm5hbWUiOiJCSSBCRUwiLCJvaWQiOiI2N2E3NmFkYS03MzViLTQ1YzktOTMwNi03OWM2NTZmNTc3YmIiLCJwdWlkIjoiMTAwMzIwMDIzODdFNTIwNyIsInJoIjoiMC5BVmtBQXNHU1VCS01rME9XNHlLQkNuV0I1UWtBQUFBQUFBQUF3QUFBQUFBQUFBQ2RBQ28uIiwic2NwIjoidXNlcl9pbXBlcnNvbmF0aW9uIiwic3ViIjoia0JIbUhJNEliczNySHA1TUlicEhVMU5lc3p2NmI4RWxNeUVLN2VRRkViTSIsInRpZCI6IjUwOTJjMTAyLThjMTItNDM5My05NmUzLTIyODEwYTc1ODFlNSIsInVuaXF1ZV9uYW1lIjoiYmliZWxAY29ycG9yYWNpb25iZWwuY29tIiwidXBuIjoiYmliZWxAY29ycG9yYWNpb25iZWwuY29tIiwidXRpIjoiZ19US2ROVUlua09HTkRyc05palZBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il19.MqNpCBps9ZUn69l8sV-r2_Dw4wyEyreqEgaupk2_SbxbR1N4EdNEGQCDEnJ7NgvlIUsQp_pf4PRFJ7xv_8KTwd0ypk4vvWy4-DWODYUkK2xa8-xc6QZH6hMbPEY7UZOZCzDM834ml0MVlcdLnZo_GEytPEsOS1eWo8zle5JzA6PclyVQ6Piz1r-_EVjMU_cAO_omktgHE8IbvfeCnMop5p8K78zw_ZcUe_avOr8wwOLgH4rIDokYK-sA6epM8tgm4Dnud3aLpfMBiEnZYL4OapYm2Wsh4lFUgqpFIJ-ZLW01Puoftkl56zp_HK32C5GmQTgG-r5Ahn_BPXmIVg75IQ',
    // tokenType: models.TokenType.Embed, // Use models.TokenType.Aad if you're embedding for your organization.
    settings: {
        panes: {
            filters: {
                expanded: false,
                visible: false
            },
            pageNavigation: {
                visible: false
            }
        },
    }
}

const eventHandlers = new Map([
    ['loaded', function () {
        console.log('Report loaded');
    }],
    ['rendered', function () {
        console.log('Report rendered');
    }],
    ['error', function (event) {
        console.log(event.detail);
    }]
]);

const getEmbeddedComponent = (embeddedReport) => {
    window.report = embeddedReport;
}

export default function powerbi() {

    return (
            <PowerBIEmbed
                embedConfig={constembedConfig}
                eventHandlers={eventHandlers}
                cssClassName={"report-style-class"}
                getEmbeddedComponent={getEmbeddedComponent}
            />
    )
}
