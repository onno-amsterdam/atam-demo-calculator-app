import { Verifier, VerifierOptions } from "@pact-foundation/pact";
import { Server } from "http";
import path from "path";
import sinon from "sinon";

import { app } from '../../../server/app';
import * as addUp from "../../../server/calculator";

let server: Server;
let executeAddUp: any;

const port = 2001;

// Verify that the provider meets all consumer expectations
describe("Task Server Pact Verification - Provider Create Tasks", () => {
  beforeAll(() => {
    // setup the mock
    executeAddUp = sinon
      .stub(addUp, 'addUp')
      .onFirstCall()
      .resolves(509);

    server = app.listen(port, () => {
      console.log(`Integration Service listening on http://localhost:${port}`)
    })
  })

  afterAll(() => {
    server.close();
    executeAddUp.restore();
  })

  it("validates the expectations the Intergration Service (consumer)", () => {
    let opts: VerifierOptions = {
      logLevel: "debug",
      providerBaseUrl: `http://localhost:${port}`,
      // Local pacts
      pactUrls: [
        path.resolve(
          process.cwd(),
          "./pacts/add-up_calculator_app-add-up_calculator_service.json"
        ),
      ]
    }

    return new Verifier(opts).verifyProvider().then(output => {
      console.log("Pact Verification Complete!")
      console.log(output)
    })
  })
})
