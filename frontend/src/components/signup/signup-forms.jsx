import { IoChevronBack } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import PersonalFields from "./personal-fields";
import PasswordField from "./password-field";

export default function SignupForms({
  progress,
  step,
  handlePreviousStep,
  form,
}) {
  return (
    <div>
      {/* Top Bar */}
      <Progress value={progress} />
      <div className="flex flex-row items-center pt-2 pb-2">
        <Button variant="ghost" onClick={handlePreviousStep}>
          <IoChevronBack />
        </Button>
        <div className="flex flex-col">
          <p>Step {step} of 3</p>
          {step === 1 && (
            <div>
              <p className="font-bold">Create a password</p>
            </div>
          )}
          {step === 2 && (
            <div>
              <p className="font-bold">Tell us about yourself</p>
            </div>
          )}
        </div>
      </div>
      {/* Step 1 - Password */}
      {step === 1 && <PasswordField form={form} />}
      {/* Step 2 - Basic Personal Information*/}
      {step === 2 && <PersonalFields form={form} />}
      {/* Step 3 - Acknowledgements */}
      {step === 3 && (
        <div>
          <p>good job cuhh</p>
        </div>
      )}
    </div>
  );
}
