def check_value(spec, measured_value=None, passed=None) -> bool:
    if spec.kind == "pass_fail":
        if passed is None:
            raise ValueError(f"{spec.parameter_name} is pass/fail and needs passed=True or False")
        return passed

    # numeric from here on
    if measured_value is None:
        raise ValueError(f"{spec.parameter_name} needs a measured value")

    if spec.min_value is not None and measured_value < spec.min_value:
        return False
    if spec.max_value is not None and measured_value > spec.max_value:
        return False
    return True
