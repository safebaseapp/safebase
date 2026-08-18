"""SERNEM Toolbox Talk content registry."""

from .chemical_safety import CHEMICAL_SAFETY
from .confined_space import CONFINED_SPACE
from .crane_banksman_safety import CRANE_BANKSMAN_SAFETY
from .dropped_objects import DROPPED_OBJECTS
from .electrical_safety import ELECTRICAL_SAFETY
from .excavation_safety import EXCAVATION_SAFETY
from .fire_safety import FIRE_SAFETY
from .forklift_safety import FORKLIFT_SAFETY
from .hand_power_tools import HAND_POWER_TOOLS
from .hot_work import HOT_WORK
from .housekeeping import HOUSEKEEPING
from .ladder_safety import LADDER_SAFETY
from .lifting_operations import LIFTING_OPERATIONS
from .loto import LOTO
from .manual_handling import MANUAL_HANDLING
from .mobile_equipment_safety import MOBILE_EQUIPMENT_SAFETY
from .ppe_safety import PPE_SAFETY
from .safety_harness import SAFETY_HARNESS
from .scaffold_safety import SCAFFOLD_SAFETY
from .working_at_height import WORKING_AT_HEIGHT

TOOLBOXES = [
    CHEMICAL_SAFETY,
    CONFINED_SPACE,
    CRANE_BANKSMAN_SAFETY,
    DROPPED_OBJECTS,
    ELECTRICAL_SAFETY,
    EXCAVATION_SAFETY,
    FIRE_SAFETY,
    FORKLIFT_SAFETY,
    HAND_POWER_TOOLS,
    HOT_WORK,
    HOUSEKEEPING,
    LADDER_SAFETY,
    LIFTING_OPERATIONS,
    LOTO,
    MANUAL_HANDLING,
    MOBILE_EQUIPMENT_SAFETY,
    PPE_SAFETY,
    SAFETY_HARNESS,
    SCAFFOLD_SAFETY,
    WORKING_AT_HEIGHT,
]

__all__ = ["TOOLBOXES"]
