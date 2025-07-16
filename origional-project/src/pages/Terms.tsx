import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Terms() {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gradient">Terms & Conditions</h1>
          <p className="text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>Welcome to Rural Catalog</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none space-y-6">
            <section>
              <h3 className="text-lg font-semibold mb-3">1. Acceptance of Terms</h3>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using Rural Catalog, you accept and agree to be bound by the terms and 
                provision of this agreement. These terms apply to all visitors, users, and others who 
                access or use the service.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">2. Use License</h3>
              <p className="text-muted-foreground leading-relaxed">
                Permission is granted to temporarily download one copy of Rural Catalog materials for 
                personal, non-commercial transitory viewing only. This is the grant of a license, not a 
                transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li>modify or copy the materials</li>
                <li>use the materials for any commercial purpose or for any public display</li>
                <li>attempt to reverse engineer any software contained on the website</li>
                <li>remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">3. User Content</h3>
              <p className="text-muted-foreground leading-relaxed">
                Users are responsible for the content they upload, including product images and descriptions. 
                By uploading content, you grant Rural Catalog a non-exclusive, royalty-free license to use, 
                modify, and display such content for the purpose of providing our services.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">4. Privacy Policy</h3>
              <p className="text-muted-foreground leading-relaxed">
                Your privacy is important to us. We collect minimal personal information necessary to 
                provide our services. We do not sell or share your personal information with third parties 
                without your consent, except as described in our Privacy Policy.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">5. Prohibited Uses</h3>
              <p className="text-muted-foreground leading-relaxed">
                You may not use our service:
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li>For any unlawful purpose or to solicit others to perform acts</li>
                <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                <li>To submit false or misleading information</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">6. Service Availability</h3>
              <p className="text-muted-foreground leading-relaxed">
                We strive to provide consistent service availability but cannot guarantee uninterrupted access. 
                The service may be temporarily unavailable due to maintenance, updates, or technical issues.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">7. Limitation of Liability</h3>
              <p className="text-muted-foreground leading-relaxed">
                In no event shall Rural Catalog or its suppliers be liable for any damages (including, 
                without limitation, damages for loss of data or profit, or due to business interruption) 
                arising out of the use or inability to use the materials on Rural Catalog's website.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">8. Accuracy of Materials</h3>
              <p className="text-muted-foreground leading-relaxed">
                The materials appearing on Rural Catalog's website could include technical, typographical, 
                or photographic errors. Rural Catalog does not warrant that any of the materials on its 
                website are accurate, complete, or current.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">9. Modifications</h3>
              <p className="text-muted-foreground leading-relaxed">
                Rural Catalog may revise these terms of service at any time without notice. By using this 
                website, you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">10. Contact Information</h3>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about these Terms & Conditions, please contact us at:
              </p>
              <div className="bg-muted p-4 rounded-lg mt-2">
                <p className="text-sm">
                  <strong>Email:</strong> support@ruralcatalog.com<br />
                  <strong>Phone:</strong> +91 9876543210<br />
                  <strong>Address:</strong> Rural Catalog, Technology Center, India
                </p>
              </div>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}